import { createServerFn } from "@tanstack/react-start";

/** Fallback hodnota; skutečná se čte z admin nastavení (sb_settings, klíče ka_*). */
export const BASE_PRICE = 2490;

export interface PostalLookupResult {
  ok: boolean;
  error?: string;
  postalCode?: string;
  city?: string;
  distanceKm?: number;
  travelPrice?: number;
  totalPrice?: number;
  basePrice?: number;
}

export interface CitySuggestion {
  placeId: string;
  name: string;
  region?: string;
}

export interface PricingSettings {
  basePrice: number;
  pricePerKm: number;
  coefficient: number;
  originPostalCode: string;
}

/** Ceník pro frontend – edituje se v admin menu CARS-EU (klíče ka_*). */
export const getPricingSettings = createServerFn({ method: "GET" }).handler(
  async (): Promise<PricingSettings> => {
    const { loadGeoSettings } = await import("./settings.server");
    const s = await loadGeoSettings();
    return {
      basePrice: s.basePrice,
      pricePerKm: s.pricePerKm,
      coefficient: s.coefficient,
      originPostalCode: s.originPostalCode,
    };
  },
);

/** Našeptávač českých měst – primárně vestavěný číselník obcí ČR, doplňkově Google Places. */
export const suggestCities = createServerFn({ method: "POST" })
  .inputValidator((data: { query: string }) => {
    const q = String(data?.query ?? "").trim().slice(0, 80);
    return { query: q };
  })
  .handler(async ({ data }): Promise<CitySuggestion[]> => {
    if (data.query.length < 2) return [];

    const { searchCities, cityId } = await import("./cz-cities.server");
    const local: CitySuggestion[] = searchCities(data.query, 8).map((c) => ({
      placeId: cityId(c),
      name: c.name,
      region: `${c.district} · ${c.postalCode.slice(0, 3)} ${c.postalCode.slice(3)}`,
    }));
    if (local.length >= 5) return local;

    const { getMapsAuth } = await import("./settings.server");
    const { mapsFetch } = await import("./maps.server");
    const auth = await getMapsAuth();
    if (!auth) return local;

    const res = await mapsFetch(auth, "/places/v1/places:autocomplete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: data.query,
        includedPrimaryTypes: ["locality", "postal_town"],
        includedRegionCodes: ["cz"],
        languageCode: "cs",
      }),
    });

    if (!res.ok) {
      console.error(`Autocomplete failed [${res.status}]: ${await res.text()}`);
      return local;
    }

    const json = (await res.json()) as {
      suggestions?: Array<{
        placePrediction?: {
          placeId?: string;
          structuredFormat?: { mainText?: { text?: string }; secondaryText?: { text?: string } };
        };
      }>;
    };

    const remote = (json.suggestions ?? [])
      .map((s) => s.placePrediction)
      .filter((p): p is NonNullable<typeof p> => !!p?.placeId && !!p.structuredFormat?.mainText?.text)
      .map((p) => ({
        placeId: p.placeId as string,
        name: p.structuredFormat?.mainText?.text as string,
        region: p.structuredFormat?.secondaryText?.text,
      }));

    const seen = new Set(local.map((l) => l.name.toLowerCase()));
    return [...local, ...remote.filter((r) => !seen.has(r.name.toLowerCase()))].slice(0, 8);
  });


/** Ověří město podle placeId a doplní PSČ + cenu dopravy. */
export const lookupCityPrice = createServerFn({ method: "POST" })
  .inputValidator((data: { placeId: string }) => {
    const id = String(data?.placeId ?? "").trim();
    if (!id || id.length > 200) throw new Error("invalid_place_id");
    return { placeId: id };
  })
  .handler(async ({ data }): Promise<PostalLookupResult> => {
    const { loadGeoSettings, getMapsAuth } = await import("./settings.server");
    const { haversineKm, mapsFetch } = await import("./maps.server");
    const settings = await loadGeoSettings();

    // 1) Lokální číselník obcí ČR – funguje vždy, bez Google API.
    if (data.placeId.startsWith("cz:")) {
      const { findCityById } = await import("./cz-cities.server");
      const city = findCityById(data.placeId);
      if (!city) return { ok: false, error: "Město se nepodařilo ověřit. Vyberte jej ze seznamu." };
      const distanceKm = haversineKm(settings.origin, { lat: city.lat, lng: city.lng });
      const travelPrice = Math.round(distanceKm * settings.coefficient * settings.pricePerKm);
      return {
        ok: true,
        postalCode: `${city.postalCode.slice(0, 3)} ${city.postalCode.slice(3)}`,
        city: city.name,
        distanceKm: Math.round(distanceKm * 10) / 10,
        travelPrice,
        basePrice: settings.basePrice,
        totalPrice: settings.basePrice + travelPrice,
      };
    }

    // 2) Google Places (adresy mimo číselník).
    const auth = await getMapsAuth();
    if (!auth) return { ok: false, error: "Vyberte město ze seznamu našeptávače." };



    const detailsRes = await mapsFetch(
      auth,
      `/places/v1/places/${encodeURIComponent(data.placeId)}?languageCode=cs`,
      { headers: { "X-Goog-FieldMask": "location,displayName" } },
    );
    if (!detailsRes.ok) {
      console.error(`Place details failed [${detailsRes.status}]: ${await detailsRes.text()}`);
      return { ok: false, error: "Město se nepodařilo ověřit. Zkuste jej vybrat ze seznamu." };
    }
    const details = (await detailsRes.json()) as {
      location?: { latitude?: number; longitude?: number };
      displayName?: { text?: string };
    };
    const lat = details.location?.latitude;
    const lng = details.location?.longitude;
    if (typeof lat !== "number" || typeof lng !== "number") {
      return { ok: false, error: "Město se nepodařilo ověřit. Zkuste jej vybrat ze seznamu." };
    }

    let postalCode = "";
    const revRes = await mapsFetch(
      auth,
      `/maps/api/geocode/json?latlng=${lat},${lng}&result_type=postal_code&language=cs`,
    );
    if (revRes.ok) {
      const rev = (await revRes.json()) as {
        results?: Array<{ address_components?: Array<{ long_name: string; types: string[] }> }>;
      };
      postalCode =
        rev.results?.[0]?.address_components?.find((c) => c.types.includes("postal_code"))
          ?.long_name ?? "";
    }

    const distanceKm = haversineKm(settings.origin, { lat, lng });
    const travelPrice = Math.round(distanceKm * settings.coefficient * settings.pricePerKm);

    return {
      ok: true,
      postalCode,
      city: details.displayName?.text ?? "",
      distanceKm: Math.round(distanceKm * 10) / 10,
      travelPrice,
      basePrice: settings.basePrice,
      totalPrice: settings.basePrice + travelPrice,
    };
  });

export const lookupPostalPrice = createServerFn({ method: "POST" })
  .inputValidator((data: { postalCode: string }) => {
    const raw = String(data?.postalCode ?? "").replace(/\s+/g, "");
    if (!/^\d{5}$/.test(raw)) throw new Error("invalid_postal_code");
    return { postalCode: raw };
  })
  .handler(async ({ data }): Promise<PostalLookupResult> => {
    const { getMapsAuth, loadGeoSettings } = await import("./settings.server");
    const { mapsFetch, haversineKm } = await import("./maps.server");
    const settings = await loadGeoSettings();

    const pc = data.postalCode;
    const formatted = `${pc.slice(0, 3)} ${pc.slice(3)}`;

    // 1) Lokální číselník obcí ČR.
    const { findByPostalCode } = await import("./cz-cities.server");
    const local = findByPostalCode(pc);
    if (local) {
      const distanceKm = haversineKm(settings.origin, { lat: local.lat, lng: local.lng });
      const travelPrice = Math.round(distanceKm * settings.coefficient * settings.pricePerKm);
      return {
        ok: true,
        postalCode: formatted,
        city: local.name,
        distanceKm: Math.round(distanceKm * 10) / 10,
        travelPrice,
        basePrice: settings.basePrice,
        totalPrice: settings.basePrice + travelPrice,
      };
    }

    // 2) Google Geocoding (PSČ mimo číselník – např. pošt. přihrádky velkých měst).
    const auth = await getMapsAuth();
    if (!auth) {
      return { ok: false, error: "PSČ nebylo nalezeno. Zkontrolujte prosím zadání." };
    }

    const res = await mapsFetch(
      auth,
      `/maps/api/geocode/json?components=${encodeURIComponent(
        `country:CZ|postal_code:${formatted}`,
      )}&language=cs`,
    );

    if (!res.ok) {
      console.error(`Geocode failed [${res.status}]: ${await res.text()}`);
      return { ok: false, error: "Výpočet ceny dopravy se nezdařil." };
    }

    const json = (await res.json()) as {
      status?: string;
      results?: Array<{
        address_components?: Array<{ long_name: string; types: string[] }>;
        geometry?: { location?: { lat: number; lng: number } };
      }>;
    };

    const first = json.results?.[0];
    const loc = first?.geometry?.location;
    if (json.status !== "OK" || !loc) {
      return { ok: false, error: "PSČ nebylo nalezeno. Zkontrolujte prosím zadání." };
    }

    const comp = first?.address_components ?? [];
    const city =
      comp.find((c) => c.types.includes("postal_town"))?.long_name ??
      comp.find((c) => c.types.includes("locality"))?.long_name ??
      comp.find((c) => c.types.includes("administrative_area_level_2"))?.long_name ??
      "";

    const distanceKm = haversineKm(settings.origin, loc);
    const travelPrice = Math.round(distanceKm * settings.coefficient * settings.pricePerKm);

    return {
      ok: true,
      postalCode: formatted,
      city,
      distanceKm: Math.round(distanceKm * 10) / 10,
      travelPrice,
      basePrice: settings.basePrice,
      totalPrice: settings.basePrice + travelPrice,
    };
  });
