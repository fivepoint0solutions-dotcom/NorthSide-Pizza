import { useRouterState } from "@tanstack/react-router";
import { FeatherMark } from "./FeatherMark";

/**
 * The site-wide watermark: the brand mark, oversized and faint, as the
 * actual background of the page — not a pattern that repeats as you
 * scroll, and not a tiled wall of small copies. One large graphic (two on
 * the wider arrangements) sits fixed behind the header, the content and
 * every placard, the same way a watermark sits behind a printed page.
 *
 * Fixed to the viewport, not the document, so it reads as "the
 * background" — constant, not something you scroll past and re-encounter.
 * The arrangement (corner, size, rotation) varies by route so the site
 * doesn't feel like one image stamped identically on every page.
 *
 * data-decorative="true" is what lets high-contrast mode strip this along
 * with the rest of the site's decoration (see styles.css).
 */

interface Placement {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  size: string;
  rotate: number;
  flip?: boolean;
  opacity: number;
  duration: string;
  delay: string;
}

// One dominant mark per page, occasionally a second smaller one in the
// opposite corner for balance — never more, and never repeated in a grid.
// Sized to actually read as background art, not a corner sticker.
const ARRANGEMENTS: Placement[][] = [
  [
    {
      top: "-10%",
      left: "-10%",
      size: "44rem",
      rotate: -16,
      opacity: 0.256,
      duration: "20s",
      delay: "0s",
    },
  ],
  [
    {
      top: "-8%",
      right: "-10%",
      size: "46rem",
      rotate: 16,
      flip: true,
      opacity: 0.256,
      duration: "21s",
      delay: "0s",
    },
  ],
  [
    {
      top: "-10%",
      left: "-8%",
      size: "40rem",
      rotate: -14,
      opacity: 0.256,
      duration: "19s",
      delay: "0s",
    },
    {
      bottom: "-14%",
      right: "-12%",
      size: "30rem",
      rotate: 18,
      flip: true,
      opacity: 0.176,
      duration: "23s",
      delay: "-6s",
    },
  ],
  [
    {
      bottom: "-12%",
      left: "-10%",
      size: "42rem",
      rotate: -20,
      opacity: 0.24,
      duration: "22s",
      delay: "0s",
    },
  ],
  [
    {
      top: "-6%",
      right: "-9%",
      size: "38rem",
      rotate: 12,
      flip: true,
      opacity: 0.256,
      duration: "20s",
      delay: "0s",
    },
    {
      bottom: "-16%",
      left: "-11%",
      size: "28rem",
      rotate: -22,
      opacity: 0.16,
      duration: "24s",
      delay: "-8s",
    },
  ],
  [
    {
      top: "-9%",
      left: "6%",
      size: "42rem",
      rotate: -10,
      opacity: 0.24,
      duration: "21s",
      delay: "0s",
    },
  ],
];

function pickArrangement(pathname: string): Placement[] {
  let hash = 0;
  for (let i = 0; i < pathname.length; i++) hash = (hash * 31 + pathname.charCodeAt(i)) | 0;
  const index = Math.abs(hash) % ARRANGEMENTS.length;
  return ARRANGEMENTS[index] ?? ARRANGEMENTS[0]!;
}

export function FeatherField() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const feathers = pickArrangement(pathname);

  return (
    <div
      aria-hidden="true"
      data-decorative="true"
      className="pointer-events-none fixed inset-0 -z-[1] overflow-hidden"
    >
      {feathers.map((f, i) => (
        <span
          key={i}
          className="feather-ruffle absolute"
          style={{
            top: f.top,
            bottom: f.bottom,
            left: f.left,
            right: f.right,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
            // Baseline rotation lives here; the ruffle keyframes oscillate a
            // few degrees either side of it via these custom properties.
            ["--ruffle-from" as string]: `${f.rotate - 5}deg`,
            ["--ruffle-to" as string]: `${f.rotate + 5}deg`,
            ["--ruffle-duration" as string]: f.duration,
            ["--ruffle-delay" as string]: f.delay,
          }}
        >
          <FeatherMark tone="soft" flip={f.flip} className="h-full w-full" />
        </span>
      ))}
    </div>
  );
}

export default FeatherField;
