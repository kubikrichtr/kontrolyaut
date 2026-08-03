import process from "node:process";
import type { MapsAuth } from "./settings.server";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_maps";

/**
 * Jednotné volání Google Maps API (stejná integrace jako Stavbaterie).
 * - BYOK (vlastní klíč v secrets): voláme Google přímo.
 * - jinak: přes Lovable connector gateway.
 */
export async function mapsFetch(
  auth: MapsAuth,
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  const gateway = async () => {
    const h = new Headers(init.headers);
    h.set("Authorization", `Bearer ${process.env["LOVABLE_API_KEY"] ?? auth.lovableKey ?? ""}`);
    h.set("X-Connection-Api-Key", process.env["GOOGLE_MAPS_API_KEY"] ?? auth.key);
    return fetch(`${GATEWAY_URL}${path}`, { ...init, headers: h });
  };

  if (!auth.byok) return gateway();

  const headers = new Headers(init.headers);
  let res: Response;
  if (path.startsWith("/places/")) {
    headers.set("X-Goog-Api-Key", auth.key);
    const rest = path.slice("/places".length);
    res = await fetch(`https://places.googleapis.com${rest}`, { ...init, headers });
  } else {
    const sep = path.includes("?") ? "&" : "?";
    res = await fetch(
      `https://maps.googleapis.com${path}${sep}key=${encodeURIComponent(auth.key)}`,
      { ...init, headers },
    );
  }

  const body = await res.clone().text();
  const blocked =
    body.includes("API_KEY_HTTP_REFERRER_BLOCKED") ||
    body.includes("REQUEST_DENIED") ||
    body.includes("are blocked");
  if (blocked && process.env["LOVABLE_API_KEY"] && process.env["GOOGLE_MAPS_API_KEY"]) {
    console.warn(
      "GOOGLE_MAPS_BYOK_KEY nelze použít serverově (omezení na HTTP referrer) – fallback na Lovable gateway.",
    );
    return gateway();
  }
  return res;
}

export function haversineKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180;
  const la2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}
