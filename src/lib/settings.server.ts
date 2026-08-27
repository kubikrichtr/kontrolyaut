import process from "node:process";

/**
 * Server-only čtení editovatelných nastavení z admin menu CARS-EU.
 * Primárně tabulka `public.ka_settings` (nastavení tohoto webu),
 * fallback `public.sb_settings` (sdílené se Stavbaterií).
 */

const CARS_EU_URL = "https://ajafqafoonxoubbhcxnk.supabase.co";
const CARS_EU_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqYWZxYWZvb254b3ViYmhjeG5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwNzM1NTQsImV4cCI6MjA4MzY0OTU1NH0.j5SJwClkiZD_fIVTI4UBKRK2Z76ykMuk1HLF169c-6A";

export interface GeoSettings {
  basePrice: number;
  pricePerKm: number;
  coefficient: number;
  freeKm: number;
  originPostalCode: string;
  origin: { lat: number; lng: number };
}

export const GEO_DEFAULTS: GeoSettings = {
  basePrice: 2490,
  pricePerKm: 12.5,
  coefficient: 1.25,
  freeKm: 30,
  originPostalCode: "158 00",
  origin: { lat: 50.0559, lng: 14.3086 },
};

function num(raw: string | undefined | null, fallback: number): number {
  const n = Number(String(raw ?? "").replace(",", ".").trim());
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function nonNegative(raw: string | undefined | null, fallback: number): number {
  const n = Number(String(raw ?? "").replace(",", ".").trim());
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

function coord(raw: string | undefined | null, fallback: number): number {
  const n = Number(String(raw ?? "").replace(",", ".").trim());
  return Number.isFinite(n) ? n : fallback;
}

async function fetchTable(table: string): Promise<Array<{ key: string; value: string | null }>> {
  try {
    const res = await fetch(`${CARS_EU_URL}/rest/v1/${table}?select=key,value`, {
      headers: { apikey: CARS_EU_ANON, Authorization: `Bearer ${CARS_EU_ANON}` },
    });
    if (!res.ok) {
      console.error(`settings ${table} failed [${res.status}]: ${await res.text()}`);
      return [];
    }
    return (await res.json()) as Array<{ key: string; value: string | null }>;
  } catch (err) {
    console.error(`settings ${table} error`, err);
    return [];
  }
}

async function loadSettingsMap(): Promise<Map<string, string>> {
  const [ka, sb] = await Promise.all([fetchTable("ka_settings"), fetchTable("sb_settings")]);
  const map = new Map<string, string>();
  for (const r of sb) if (r.value) map.set(r.key, r.value);
  for (const r of ka) if (r.value) map.set(r.key, r.value);
  return map;
}

export async function loadGeoSettings(): Promise<GeoSettings> {
  const map = await loadSettingsMap();
  if (map.size === 0) return GEO_DEFAULTS;
  const get = (k: string) => map.get(`ka_${k}`) || map.get(k) || undefined;

  const originPostalCode = get("origin_postal_code") || GEO_DEFAULTS.originPostalCode;

  // Souřadnice výchozího bodu: z nastavení, jinak dopočet z PSČ (např. 158 00), jinak default.
  let origin = { ...GEO_DEFAULTS.origin };
  const rawLat = get("origin_lat");
  const rawLng = get("origin_lng");
  if (rawLat && rawLng) {
    origin = { lat: coord(rawLat, origin.lat), lng: coord(rawLng, origin.lng) };
  } else {
    const { findByPostalCode } = await import("./cz-cities.server");
    const city = findByPostalCode(originPostalCode.replace(/\s+/g, ""));
    if (city) origin = { lat: city.lat, lng: city.lng };
  }

  return {
    basePrice: Math.round(num(get("base_price_czk"), GEO_DEFAULTS.basePrice)),
    pricePerKm: num(get("price_per_km_czk"), GEO_DEFAULTS.pricePerKm),
    coefficient: num(get("distance_coefficient"), GEO_DEFAULTS.coefficient),
    freeKm: nonNegative(get("free_km"), GEO_DEFAULTS.freeKm),
    originPostalCode,
    origin,
  };
}

/** Cena dopravy: silniční km (vzdušná čára × koeficient) mínus kilometry zdarma. */
export function travelPriceCzk(distanceKm: number, s: GeoSettings): number {
  const roadKm = distanceKm * s.coefficient;
  const billableKm = Math.max(0, roadKm - s.freeKm);
  return Math.round(billableKm * s.pricePerKm);
}

export interface MapsAuth {
  byok: boolean;
  key: string;
  lovableKey?: string;
}

/**
 * Pořadí zdrojů klíče:
 * 1) klíč nastavený v adminu CARS-EU (ka_settings / sb_settings)
 * 2) Lovable connector gateway (LOVABLE_API_KEY + GOOGLE_MAPS_API_KEY)
 * 3) secret GOOGLE_MAPS_BYOK_KEY
 */
export async function getMapsAuth(): Promise<MapsAuth | null> {
  const map = await loadSettingsMap();
  const candidates = [
    "ka_google_maps_server_key",
    "google_maps_server_key",
    "ka_google_maps_byok_key",
    "google_maps_byok_key",
    "ka_google_maps_api_key",
    "google_maps_api_key",
    "ka_google_maps_browser_key",
    "google_maps_browser_key",
  ];
  for (const c of candidates) {
    const v = (map.get(c) ?? "").trim();
    if (v) return { byok: true, key: v };
  }

  const lovableKey = process.env["LOVABLE_API_KEY"];
  const mapsKey = process.env["GOOGLE_MAPS_API_KEY"];
  if (lovableKey && mapsKey) return { byok: false, key: mapsKey, lovableKey };

  const byok = process.env["GOOGLE_MAPS_BYOK_KEY"];
  if (byok) return { byok: true, key: byok };
  return null;
}
