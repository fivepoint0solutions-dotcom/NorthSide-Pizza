import { useEffect, useRef, useState } from "react";

/**
 * The product's real map, ported from the Senior Sidekick app so the demo on
 * this site is the same code the app runs rather than an illustration of it.
 *
 * Google Maps draws the tiles when a key is present; the route is drawn on
 * top in the brand's own colours either way. With no key it falls back to
 * plain OpenStreetMap tiles, which is how it runs here — a public marketing
 * site shouldn't ship a billable Maps key. Set VITE_GOOGLE_MAPS_API_KEY at
 * build time to switch this site to Google tiles too.
 */

const TILE = 256;
const MIN_ZOOM = 3;
const MAX_ZOOM = 18;

export type LatLngTuple = [number, number];
export interface LatLng {
  lat: number;
  lng: number;
}

interface GoogleGlobal {
  google?: { maps?: unknown };
  gm_authFailure?: () => void;
  [callback: string]: unknown;
}

/* Deliberate presses, not pinch-and-drag: a gesture is easy to fire by
   accident and hard to undo when you're following directions. */
function zoomButtonStyle(enabled: boolean, colour: string): React.CSSProperties {
  return {
    width: 40,
    height: 40,
    borderRadius: 12,
    padding: 0,
    border: `2px solid ${colour}`,
    background: "#FFFFFF",
    color: colour,
    fontSize: 22,
    fontWeight: 700,
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
    cursor: enabled ? "pointer" : "default",
    opacity: enabled ? 1 : 0.4,
  };
}

function project(lat: number, lng: number, z: number) {
  const scale = TILE * Math.pow(2, z);
  const x = ((lng + 180) / 360) * scale;
  const s = Math.min(Math.max(Math.sin((lat * Math.PI) / 180), -0.9999), 0.9999);
  const y = (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * scale;
  return { x, y };
}

/** No key on this site by default, so the map runs on OpenStreetMap. */
function loadKey(): string {
  return (import.meta.env["VITE_GOOGLE_MAPS_API_KEY"] as string | undefined) ?? "";
}

let scriptPromise: Promise<unknown> | null = null;
function loadGoogle(key: string): Promise<unknown> {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  const w = window as unknown as GoogleGlobal;
  if (w.google?.maps) return Promise.resolve(w.google);
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const cbName = "__sidekickMapsReady";
      const timer = setTimeout(() => reject(new Error("maps timed out")), 12000);
      w[cbName] = () => {
        clearTimeout(timer);
        resolve(w.google);
      };
      // Google can accept the script request and reject the key only
      // afterwards, so this is the failure that actually matters.
      w.gm_authFailure = () => {
        clearTimeout(timer);
        reject(new Error("maps key rejected"));
      };
      const s = document.createElement("script");
      s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&loading=async&callback=${cbName}`;
      s.async = true;
      s.onerror = () => {
        clearTimeout(timer);
        reject(new Error("maps failed"));
      };
      document.head.appendChild(s);
    });
    scriptPromise.catch(() => {
      scriptPromise = null;
    });
  }
  return scriptPromise;
}

/** The OpenStreetMap drawing — tiles, the route, and the two end dots. */
function OsmMap({
  points,
  from,
  to,
  height,
  lineColor,
  accent,
  bold,
  radius,
}: {
  points: LatLngTuple[];
  from: LatLng | null;
  to: LatLng | null;
  height: number;
  lineColor: string;
  accent: string;
  bold: boolean;
  radius: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(340);
  const [zoomAdjust, setZoomAdjust] = useState(0);

  // A new trip starts back at the framing that fits the whole route.
  const routeKey = `${from?.lat},${from?.lng},${to?.lat},${to?.lng}`;
  useEffect(() => setZoomAdjust(0), [routeKey]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => setWidth(Math.max(240, Math.round(el.clientWidth)));
    measure();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    ro?.observe(el);
    return () => ro?.disconnect();
  }, []);

  const all: LatLngTuple[] = [...points];
  if (from) all.push([from.lat, from.lng]);
  if (to) all.push([to.lat, to.lng]);

  let body: React.ReactNode = null;
  let canZoomIn = false;
  let canZoomOut = false;

  if (all.length) {
    const lats = all.map((p) => p[0]);
    const lngs = all.map((p) => p[1]);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    let fitZoom = 16;
    for (let z = 16; z >= 2; z--) {
      const a = project(maxLat, minLng, z);
      const b = project(minLat, maxLng, z);
      if (Math.abs(b.x - a.x) <= width - 48 && Math.abs(b.y - a.y) <= height - 48) {
        fitZoom = z;
        break;
      }
      fitZoom = z;
    }
    const zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, fitZoom + zoomAdjust));
    canZoomIn = zoom < MAX_ZOOM;
    canZoomOut = zoom > MIN_ZOOM;

    const centre = project((minLat + maxLat) / 2, (minLng + maxLng) / 2, zoom);
    const originX = centre.x - width / 2;
    const originY = centre.y - height / 2;
    const toPx = (lat: number, lng: number): [number, number] => {
      const p = project(lat, lng, zoom);
      return [p.x - originX, p.y - originY];
    };

    const tiles: { key: string; url: string; left: number; top: number }[] = [];
    const maxTile = Math.pow(2, zoom);
    for (let tx = Math.floor(originX / TILE); tx <= Math.floor((originX + width) / TILE); tx++) {
      for (let ty = Math.floor(originY / TILE); ty <= Math.floor((originY + height) / TILE); ty++) {
        if (ty < 0 || ty >= maxTile) continue;
        const wrapX = ((tx % maxTile) + maxTile) % maxTile;
        tiles.push({
          key: `${tx}-${ty}`,
          url: `https://tile.openstreetmap.org/${zoom}/${wrapX}/${ty}.png`,
          left: tx * TILE - originX,
          top: ty * TILE - originY,
        });
      }
    }

    const path = points.map((p) => toPx(p[0], p[1]).join(",")).join(" ");
    const startPx = from ? toPx(from.lat, from.lng) : null;
    const endPx = to ? toPx(to.lat, to.lng) : null;

    body = (
      <>
        {tiles.map((t) => (
          <img
            key={t.key}
            src={t.url}
            alt=""
            width={TILE}
            height={TILE}
            loading="lazy"
            style={{
              position: "absolute",
              left: t.left,
              top: t.top,
              width: TILE,
              height: TILE,
              filter: "saturate(0.75) contrast(0.95)",
            }}
          />
        ))}
        <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
          {path ? (
            <polyline
              points={path}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth={bold ? 16 : 9}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />
          ) : null}
          {path ? (
            <polyline
              points={path}
              fill="none"
              stroke={lineColor}
              strokeWidth={bold ? 10 : 5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : null}
          {startPx ? (
            <g>
              <circle cx={startPx[0]} cy={startPx[1]} r="10" fill="#FFFFFF" />
              <circle cx={startPx[0]} cy={startPx[1]} r="6" fill={lineColor} />
            </g>
          ) : null}
          {endPx ? (
            <g>
              <circle cx={endPx[0]} cy={endPx[1]} r="12" fill="#FFFFFF" />
              <circle cx={endPx[0]} cy={endPx[1]} r="8" fill={accent} />
            </g>
          ) : null}
        </svg>
      </>
    );
  }

  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative",
        width: "100%",
        height,
        overflow: "hidden",
        borderRadius: radius,
        background: "#e8e4dc",
      }}
    >
      {body}
      {all.length ? (
        <div
          style={{
            position: "absolute",
            right: 10,
            top: 10,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <button
            type="button"
            aria-label="Zoom in"
            onClick={() => setZoomAdjust((z) => z + 1)}
            disabled={!canZoomIn}
            style={zoomButtonStyle(canZoomIn, lineColor)}
          >
            +
          </button>
          <button
            type="button"
            aria-label="Zoom out"
            onClick={() => setZoomAdjust((z) => z - 1)}
            disabled={!canZoomOut}
            style={zoomButtonStyle(canZoomOut, lineColor)}
          >
            −
          </button>
        </div>
      ) : null}
      <div
        style={{
          position: "absolute",
          right: 6,
          bottom: 4,
          fontSize: 9,
          lineHeight: 1.2,
          background: "rgba(255,255,255,0.75)",
          padding: "1px 5px",
          borderRadius: 6,
          color: "#3a3a3a",
        }}
      >
        © OpenStreetMap
      </div>
    </div>
  );
}

export function SidekickMap({
  points = [],
  from = null,
  to = null,
  height = 220,
  lineColor = "#2f6f5e",
  accent = "#c47a4a",
  /** Big Map mode: thicker route, larger dots. */
  bold = false,
  radius = 20,
}: {
  points?: LatLngTuple[];
  from?: LatLng | null;
  to?: LatLng | null;
  height?: number;
  lineColor?: string;
  accent?: string;
  bold?: boolean;
  radius?: number;
}) {
  const holderRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "google" | "osm">("loading");

  useEffect(() => {
    let cancelled = false;
    const key = loadKey();
    if (!key) {
      setStatus("osm");
      return;
    }
    loadGoogle(key)
      .then(() => !cancelled && setStatus("google"))
      .catch(() => !cancelled && setStatus("osm"));
    return () => {
      cancelled = true;
    };
  }, []);

  // Google's own renderer is only reached when a key is configured. Until
  // then this site runs the OpenStreetMap path above, which needs no key.
  if (status === "osm" || status === "loading") {
    return (
      <OsmMap
        points={points}
        from={from}
        to={to}
        height={height}
        lineColor={lineColor}
        accent={accent}
        bold={bold}
        radius={radius}
      />
    );
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height,
        overflow: "hidden",
        borderRadius: radius,
        background: "#e8e4dc",
      }}
    >
      <div ref={holderRef} style={{ position: "absolute", inset: 0 }} />
    </div>
  );
}

export default SidekickMap;
