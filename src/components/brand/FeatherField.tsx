import { useRouterState } from "@tanstack/react-router";
import { FeatherMark } from "./FeatherMark";

/**
 * The site-wide watermark: one to three feathers drifting behind every
 * page, as if caught mid-fall. Fixed to the viewport (not the document), so
 * it never contributes to page height or horizontal scroll, and clipped to
 * it so an oversized feather near an edge can't cause either.
 *
 * The arrangement varies by route — different count, size and corners per
 * page — so the site doesn't read as one fixed background image repeated
 * everywhere. Each feather sways on its own slow, staggered timer: subtle,
 * a few degrees, never in sync with its neighbours.
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

// Five hand-placed arrangements, favouring the top corners as asked for,
// with the odd feather lower down so the field doesn't feel like a header
// decoration repeated at every scroll position. Sizes stay large — never a
// small confetti scatter — per "I don't want him to be super small."
const ARRANGEMENTS: Placement[][] = [
  [
    {
      top: "-8%",
      left: "-6%",
      size: "26rem",
      rotate: -18,
      opacity: 0.168,
      duration: "14s",
      delay: "0s",
    },
    {
      top: "4%",
      right: "-9%",
      size: "22rem",
      rotate: 24,
      flip: true,
      opacity: 0.144,
      duration: "16s",
      delay: "-4s",
    },
  ],
  [
    {
      top: "-10%",
      right: "-7%",
      size: "30rem",
      rotate: 14,
      flip: true,
      opacity: 0.168,
      duration: "15s",
      delay: "0s",
    },
    {
      bottom: "-6%",
      left: "-8%",
      size: "20rem",
      rotate: -30,
      opacity: 0.132,
      duration: "18s",
      delay: "-6s",
    },
  ],
  [
    {
      top: "2%",
      left: "-8%",
      size: "24rem",
      rotate: -10,
      opacity: 0.156,
      duration: "13s",
      delay: "0s",
    },
  ],
  [
    {
      top: "-6%",
      left: "6%",
      size: "20rem",
      rotate: -22,
      opacity: 0.144,
      duration: "14s",
      delay: "0s",
    },
    {
      top: "18%",
      right: "-8%",
      size: "26rem",
      rotate: 20,
      flip: true,
      opacity: 0.144,
      duration: "17s",
      delay: "-3s",
    },
    {
      bottom: "4%",
      left: "-6%",
      size: "18rem",
      rotate: -34,
      opacity: 0.12,
      duration: "19s",
      delay: "-8s",
    },
  ],
  [
    {
      top: "-9%",
      right: "8%",
      size: "28rem",
      rotate: 8,
      flip: true,
      opacity: 0.168,
      duration: "15s",
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
            ["--ruffle-from" as string]: `${f.rotate - 3}deg`,
            ["--ruffle-to" as string]: `${f.rotate + 3}deg`,
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
