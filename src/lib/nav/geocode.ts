import type { Coords } from "./types";

const TOKEN = import.meta.env["VITE_MAPBOX_TOKEN"] as string | undefined;

export function mapboxToken(): string {
  if (!TOKEN) throw new Error("VITE_MAPBOX_TOKEN is not set.");
  return TOKEN;
}

export interface GeocodeHit extends Coords {
  /** Normalized address Mapbox matched, stored so we can skip re-geocoding. */
  formatted: string;
}

/**
 * Forward-geocode a free-text address. Called once, on save — never per trip.
 */
export async function geocodeAddress(
  address: string,
  opts: { country?: string; proximity?: Coords } = {},
): Promise<GeocodeHit | null> {
  const q = address.trim();
  if (!q) return null;

  const params = new URLSearchParams({
    q,
    access_token: mapboxToken(),
    limit: "1",
    country: opts.country ?? "us",
  });
  if (opts.proximity) params.set("proximity", `${opts.proximity.lng},${opts.proximity.lat}`);

  const res = await fetch(`https://api.mapbox.com/search/geocode/v6/forward?${params.toString()}`);
  if (!res.ok) throw new Error(`Mapbox geocode ${res.status}: ${await res.text()}`);

  const data = (await res.json()) as {
    features?: Array<{
      properties?: {
        full_address?: string;
        name?: string;
        coordinates?: { latitude: number; longitude: number };
      };
      geometry?: { coordinates?: [number, number] };
    }>;
  };

  const feature = data.features?.[0];
  if (!feature) return null;

  const coord = feature.properties?.coordinates;
  const lng = coord?.longitude ?? feature.geometry?.coordinates?.[0];
  const lat = coord?.latitude ?? feature.geometry?.coordinates?.[1];
  if (typeof lat !== "number" || typeof lng !== "number") return null;

  return { lat, lng, formatted: feature.properties?.full_address ?? feature.properties?.name ?? q };
}
