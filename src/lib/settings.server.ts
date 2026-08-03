import process from "node:process";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-only čtení editovatelných nastavení z tabulky public.sb_settings
 * ve sdílené databázi CARS-EU. Klíče tohoto webu mají prefix `ka_`,
 * aby se nemíchaly s nastavením Stavbaterie.
 */

export interface GeoSettings {
  basePrice: number;
  pricePerKm: number;
  coefficient: number;
  originPostalCode: string;
  origin: { lat: number; lng: number };
}

export const GEO_DEFAULTS: GeoSettings = {
  basePrice: 2490,
  pricePerKm: 20,
  coefficient: 1.25,
  originPostalCode: "158 00",
  origin: { lat: 50.0559, lng: 14.3086 },
};

function num(raw: string | undefined | null, fallback: number): number {
  const n = Number(String(raw ?? "").replace(",", ".").trim());
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function coord(raw: string | undefined | null, fallback: number): number {
  const n = Number(String(raw ?? "").replace(",", ".").trim());
  return Number.isFinite(n) ? n : fallback;
}

export async function loadGeoSettings(): Promise<GeoSettings> {
  const url =
    import.meta.env.VITE_SUPABASE_URL ??
    process.env["SUPABASE_URL"] ??
    process.env["VITE_SUPABASE_URL"];
  const key =
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
    process.env["SUPABASE_PUBLISHABLE_KEY"] ??
    process.env["VITE_SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) return GEO_DEFAULTS;

  try {
    const client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await client.from("sb_settings").select("key, value");
    if (error || !data) return GEO_DEFAULTS;

    const map = new Map<string, string>(
      (data as Array<{ key: string; value: string | null }>).map((r) => [r.key, r.value ?? ""]),
    );
    const get = (k: string) => map.get(`ka_${k}`) || undefined;

    return {
      basePrice: Math.round(num(get("base_price_czk"), GEO_DEFAULTS.basePrice)),
      pricePerKm: num(get("price_per_km_czk"), GEO_DEFAULTS.pricePerKm),
      coefficient: num(get("distance_coefficient"), GEO_DEFAULTS.coefficient),
      originPostalCode: get("origin_postal_code") || GEO_DEFAULTS.originPostalCode,
      origin: {
        lat: coord(get("origin_lat"), GEO_DEFAULTS.origin.lat),
        lng: coord(get("origin_lng"), GEO_DEFAULTS.origin.lng),
      },
    };
  } catch (err) {
    console.error("loadGeoSettings failed", err);
    return GEO_DEFAULTS;
  }
}

export interface MapsAuth {
  byok: boolean;
  key: string;
  lovableKey?: string;
}

export function getMapsAuth(): MapsAuth | null {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const mapsKey = process.env["GOOGLE_MAPS_API_KEY"];
  if (lovableKey && mapsKey) return { byok: false, key: mapsKey, lovableKey };

  const byok = process.env["GOOGLE_MAPS_BYOK_KEY"];
  if (byok) return { byok: true, key: byok };
  return null;
}
