import { useEffect, useMemo, useRef, useState } from "react";
import {
  BIG_MAP_STYLE_URL,
  CARD,
  HIDDEN_LAYER_PREFIXES,
  MAP_DEFAULTS,
  ROUTE_CASING_LAYER_ID,
  ROUTE_CASING_PAINT,
  ROUTE_LINE_LAYER_ID,
  ROUTE_LINE_LAYOUT,
  ROUTE_LINE_PAINT,
  ROUTE_SOURCE_ID,
} from "@/lib/nav/bigMapStyle";
import {
  fetchRoute,
  haversine,
  metresToPlain,
  secondsToPlain,
  type Route,
} from "@/lib/nav/directions";
import { mapboxToken } from "@/lib/nav/geocode";
import { loadMapboxGl, type GLMap, type GLMarker } from "@/lib/nav/mapboxgl";
import type { Coords } from "@/lib/nav/types";

interface BigMapViewProps {
  destination: Coords;
  /** Shown on the card — the nickname the person actually said. */
  label: string;
  address?: string | null;
  onExit?: () => void;
  /** Where the turn card sits. Bottom is easier to reach on a phone mount. */
  cardPosition?: "top" | "bottom";
}

export function BigMapView({
  destination,
  label,
  address,
  onExit,
  cardPosition = "bottom",
}: BigMapViewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<GLMap | null>(null);
  const meMarkerRef = useRef<GLMarker | null>(null);

  const [origin, setOrigin] = useState<Coords | null>(null);
  const [route, setRoute] = useState<Route | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // 1. Where are we, and keep following.
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("This device can't share its location.");
      return;
    }
    const watchId = navigator.geolocation.watchPosition(
      (pos) => setOrigin({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setError("Turn on location to get directions."),
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 20000 },
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // 2. Route once we have a first fix.
  const routeKey = route
    ? "have"
    : origin
      ? `${origin.lat.toFixed(3)},${origin.lng.toFixed(3)}`
      : "";
  useEffect(() => {
    if (!origin || route) return;
    let cancelled = false;
    fetchRoute(origin, destination)
      .then((r) => {
        if (cancelled) return;
        if (!r) setError("I couldn't find a road route there.");
        else setRoute(r);
      })
      .catch(() => !cancelled && setError("Directions aren't available right now."));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeKey, destination.lat, destination.lng]);

  // 3. Map, once.
  useEffect(() => {
    const container = containerRef.current;
    if (!container || mapRef.current) return;

    let disposed = false;
    let token: string;
    try {
      token = mapboxToken();
    } catch {
      setError("The map isn't set up yet (missing Mapbox token).");
      return;
    }

    loadMapboxGl(token)
      .then((gl) => {
        if (disposed) return;
        const map = new gl.Map({
          container,
          style: BIG_MAP_STYLE_URL,
          center: [destination.lng, destination.lat],
          zoom: MAP_DEFAULTS.zoom,
          pitch: MAP_DEFAULTS.pitch,
          attributionControl: MAP_DEFAULTS.attributionControl,
        });
        mapRef.current = map;

        map.on("load", () => {
          // Strip clutter: no POIs, no transit, nothing to read but roads.
          for (const layer of map.getStyle().layers ?? []) {
            if (HIDDEN_LAYER_PREFIXES.some((p) => layer.id.startsWith(p))) {
              map.setLayoutProperty(layer.id, "visibility", "none");
            }
          }
          map.addSource(ROUTE_SOURCE_ID, {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: { type: "LineString", coordinates: [] },
            },
          });
          map.addLayer({
            id: ROUTE_CASING_LAYER_ID,
            type: "line",
            source: ROUTE_SOURCE_ID,
            layout: ROUTE_LINE_LAYOUT,
            paint: ROUTE_CASING_PAINT,
          });
          map.addLayer({
            id: ROUTE_LINE_LAYER_ID,
            type: "line",
            source: ROUTE_SOURCE_ID,
            layout: ROUTE_LINE_LAYOUT,
            paint: ROUTE_LINE_PAINT,
          });
          new gl.Marker({ color: CARD.accent })
            .setLngLat([destination.lng, destination.lat])
            .addTo(map);
        });
      })
      .catch(() => setError("The map couldn't load."));

    return () => {
      disposed = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [destination.lat, destination.lng]);

  // 4. Paint the route.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !route) return;
    const source = map.getSource(ROUTE_SOURCE_ID);
    if (!source) return;
    source.setData({
      type: "Feature",
      properties: {},
      geometry: { type: "LineString", coordinates: route.geometry },
    });

    let minLng = 180,
      minLat = 90,
      maxLng = -180,
      maxLat = -90;
    for (const [lng, lat] of route.geometry) {
      minLng = Math.min(minLng, lng);
      maxLng = Math.max(maxLng, lng);
      minLat = Math.min(minLat, lat);
      maxLat = Math.max(maxLat, lat);
    }
    map.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: 120, duration: 800, pitch: 0 },
    );
  }, [route]);

  // 5. Follow the driver: move the dot, advance the turn card.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !origin) return;

    const gl = (
      window as unknown as { mapboxgl?: { Marker: new (o?: Record<string, unknown>) => GLMarker } }
    ).mapboxgl;
    if (gl) {
      if (!meMarkerRef.current) {
        meMarkerRef.current = new gl.Marker({ color: "#ffffff" })
          .setLngLat([origin.lng, origin.lat])
          .addTo(map);
      } else {
        meMarkerRef.current.setLngLat([origin.lng, origin.lat]);
      }
    }

    if (!route) return;
    const current = route.steps[stepIndex];
    if (current && haversine(origin, current.location) < 35 && stepIndex < route.steps.length - 1) {
      setStepIndex(stepIndex + 1);
      map.easeTo({
        center: [origin.lng, origin.lat],
        zoom: MAP_DEFAULTS.zoom,
        pitch: MAP_DEFAULTS.pitch,
      });
    }
  }, [origin, route, stepIndex]);

  const step = route?.steps[stepIndex];
  const remaining = useMemo(() => {
    if (!route) return null;
    return { distance: metresToPlain(route.distance), time: secondsToPlain(route.duration) };
  }, [route]);

  const distanceToTurn = step && origin ? metresToPlain(haversine(origin, step.location)) : null;

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[#10233b]">
      <div ref={containerRef} className="absolute inset-0" />

      {/* Big turn card — one instruction, nothing else competing with it. */}
      <div
        className={`pointer-events-none absolute inset-x-0 px-4 ${
          cardPosition === "top" ? "top-0 pt-4" : "bottom-0 pb-6"
        }`}
      >
        <div
          className="pointer-events-auto rounded-3xl px-6 py-5 shadow-2xl"
          style={{ background: CARD.bg, color: CARD.fg }}
        >
          <p
            className="text-lg font-semibold uppercase tracking-wide"
            style={{ color: CARD.muted }}
          >
            Going to {label}
          </p>

          {error ? (
            <p className="mt-2 text-3xl font-bold leading-tight">{error}</p>
          ) : step ? (
            <>
              <p className="mt-1 text-[2.75rem] font-extrabold leading-tight">{step.instruction}</p>
              {distanceToTurn ? (
                <p className="mt-1 text-2xl font-bold" style={{ color: CARD.accent }}>
                  in {distanceToTurn}
                </p>
              ) : null}
            </>
          ) : (
            <p className="mt-2 text-3xl font-bold leading-tight">Finding the way…</p>
          )}

          <div className="mt-4 flex items-center justify-between gap-4">
            <p className="text-xl" style={{ color: CARD.muted }}>
              {remaining ? `${remaining.time} · ${remaining.distance}` : (address ?? "")}
            </p>
            {onExit ? (
              <button
                type="button"
                onClick={onExit}
                className="rounded-2xl px-6 py-3 text-xl font-bold"
                style={{ background: CARD.accent, color: "#052440" }}
              >
                Stop
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
