/**
 * Big Map look-and-feel. Everything visual lives here so the map component
 * stays plumbing.
 *
 * Base style: Mapbox's navigation style, then simplified — clutter labels off,
 * roads fattened, one very wide route line. No Google-style chrome.
 */

export const BIG_MAP_STYLE_URL =
  (import.meta.env["VITE_MAPBOX_STYLE_URL"] as string | undefined) ??
  "mapbox://styles/mapbox/navigation-day-v1";

export const ROUTE_SOURCE_ID = "big-route";
export const ROUTE_CASING_LAYER_ID = "big-route-casing";
export const ROUTE_LINE_LAYER_ID = "big-route-line";

export const MAP_DEFAULTS = {
  zoom: 16.5,
  pitch: 55,
  bearing: 0,
  /** Chrome we deliberately do not show: compass, scale, fullscreen, geolocate dot UI. */
  attributionControl: { compact: true },
} as const;

/** Layer ids matched by prefix and hidden — keeps the map readable at a glance. */
export const HIDDEN_LAYER_PREFIXES = ["poi", "transit", "airport", "natural-", "water-point"];

/** Route casing sits under the route line to give it a hard edge. */
export const ROUTE_CASING_PAINT = {
  "line-color": "#0b3b6f",
  "line-width": ["interpolate", ["linear"], ["zoom"], 10, 14, 14, 22, 18, 34],
  "line-opacity": 0.95,
} as const;

/** The route itself: deliberately huge — this is read at arm's length. */
export const ROUTE_LINE_PAINT = {
  "line-color": "#2f9bff",
  "line-width": ["interpolate", ["linear"], ["zoom"], 10, 9, 14, 16, 18, 26],
} as const;

export const ROUTE_LINE_LAYOUT = { "line-cap": "round", "line-join": "round" } as const;

/** Road lines get thickened relative to the base style. */
export const ROAD_WIDTH_BOOST = 1.6;

/** Big turn-card colors, kept in sync with the route line. */
export const CARD = {
  bg: "#10233b",
  fg: "#ffffff",
  accent: "#2f9bff",
  muted: "#a8c3e0",
} as const;
