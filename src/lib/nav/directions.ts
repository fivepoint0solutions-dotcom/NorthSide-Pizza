import { mapboxToken } from "./geocode";
import type { Coords } from "./types";

export interface TurnStep {
  instruction: string;
  /** Metres to the maneuver from the start of this step. */
  distance: number;
  maneuver: string;
  modifier?: string;
  location: Coords;
}

export interface Route {
  /** GeoJSON LineString coordinates, [lng, lat]. */
  geometry: [number, number][];
  distance: number;
  duration: number;
  steps: TurnStep[];
}

export async function fetchRoute(from: Coords, to: Coords): Promise<Route | null> {
  const params = new URLSearchParams({
    access_token: mapboxToken(),
    geometries: "geojson",
    overview: "full",
    steps: "true",
    language: "en",
    banner_instructions: "true",
  });
  const url =
    `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/` +
    `${from.lng},${from.lat};${to.lng},${to.lat}?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Mapbox directions ${res.status}: ${await res.text()}`);

  const data = (await res.json()) as {
    routes?: Array<{
      distance: number;
      duration: number;
      geometry: { coordinates: [number, number][] };
      legs?: Array<{
        steps?: Array<{
          distance: number;
          maneuver: {
            instruction: string;
            type: string;
            modifier?: string;
            location: [number, number];
          };
        }>;
      }>;
    }>;
  };

  const route = data.routes?.[0];
  if (!route) return null;

  const steps: TurnStep[] = [];
  for (const leg of route.legs ?? []) {
    for (const step of leg.steps ?? []) {
      steps.push({
        instruction: step.maneuver.instruction,
        distance: step.distance,
        maneuver: step.maneuver.type,
        ...(step.maneuver.modifier ? { modifier: step.maneuver.modifier } : {}),
        location: { lng: step.maneuver.location[0], lat: step.maneuver.location[1] },
      });
    }
  }

  return {
    geometry: route.geometry.coordinates,
    distance: route.distance,
    duration: route.duration,
    steps,
  };
}

export function metresToPlain(metres: number): string {
  const feet = metres * 3.28084;
  if (feet < 800) return `${Math.round(feet / 50) * 50} feet`;
  const miles = metres / 1609.34;
  return `${miles < 10 ? miles.toFixed(1) : Math.round(miles)} miles`;
}

export function secondsToPlain(seconds: number): string {
  const mins = Math.round(seconds / 60);
  if (mins < 60) return `${mins} min`;
  const hours = Math.floor(mins / 60);
  return `${hours} hr ${mins % 60} min`;
}

/** Straight-line metres — good enough to decide when a turn step is done. */
export function haversine(a: Coords, b: Coords): number {
  const R = 6371000;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(h));
}
