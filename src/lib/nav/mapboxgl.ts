/**
 * Loads Mapbox GL JS from the CDN at runtime so the bundle stays lean and the
 * project needs no extra npm dependency. Types below are the narrow slice the
 * Big Map view uses.
 */

const VERSION = "3.9.0";
const JS_URL = `https://api.mapbox.com/mapbox-gl-js/v${VERSION}/mapbox-gl.js`;
const CSS_URL = `https://api.mapbox.com/mapbox-gl-js/v${VERSION}/mapbox-gl.css`;

export interface GLMap {
  on(event: string, handler: () => void): void;
  remove(): void;
  addSource(id: string, source: Record<string, unknown>): void;
  getSource(id: string): { setData(data: Record<string, unknown>): void } | undefined;
  addLayer(layer: Record<string, unknown>): void;
  getLayer(id: string): unknown;
  setLayoutProperty(layer: string, prop: string, value: unknown): void;
  getStyle(): { layers?: Array<{ id: string; type: string }> };
  fitBounds(bounds: [[number, number], [number, number]], options: Record<string, unknown>): void;
  easeTo(options: Record<string, unknown>): void;
  addControl(control: unknown, position?: string): void;
}

export interface GLMarker {
  setLngLat(lngLat: [number, number]): GLMarker;
  addTo(map: GLMap): GLMarker;
  remove(): void;
}

interface MapboxGL {
  accessToken: string;
  Map: new (options: Record<string, unknown>) => GLMap;
  Marker: new (options?: Record<string, unknown>) => GLMarker;
}

let loading: Promise<MapboxGL> | null = null;

export function loadMapboxGl(token: string): Promise<MapboxGL> {
  if (typeof window === "undefined") return Promise.reject(new Error("Map needs a browser."));

  const existing = (window as unknown as { mapboxgl?: MapboxGL }).mapboxgl;
  if (existing) {
    existing.accessToken = token;
    return Promise.resolve(existing);
  }
  if (loading) return loading;

  loading = new Promise<MapboxGL>((resolve, reject) => {
    if (!document.querySelector(`link[href="${CSS_URL}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = CSS_URL;
      document.head.appendChild(link);
    }
    const script = document.createElement("script");
    script.src = JS_URL;
    script.async = true;
    script.onload = () => {
      const gl = (window as unknown as { mapboxgl?: MapboxGL }).mapboxgl;
      if (!gl) {
        reject(new Error("Mapbox GL failed to load."));
        return;
      }
      gl.accessToken = token;
      resolve(gl);
    };
    script.onerror = () => reject(new Error("Mapbox GL failed to load."));
    document.head.appendChild(script);
  });

  return loading;
}
