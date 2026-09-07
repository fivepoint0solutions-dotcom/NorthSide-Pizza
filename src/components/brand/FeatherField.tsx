import { useRouterState } from "@tanstack/react-router";
import { FeatherMark } from "./FeatherMark";

/**
 * The site-wide watermark: feathers drifting behind the page, as if caught
 * mid-fall. Absolutely positioned against the full document height (not the
 * viewport), so it scrolls with the page and reappears repeatedly down the
 * whole length of every route — this is what makes it read as "splashed all
 * over the site" rather than a decoration stuck to one corner of the screen.
 *
 * The arrangement varies by route — different count, size and corners per
 * page — so the site doesn't read as one image repeated everywhere. Each
 * feather sways on its own slow, staggered timer: subtle, a few degrees,
 * never in sync with its neighbours.
 *
 * data-decorative="true" is what lets high-contrast mode strip this along
 * with the rest of the site's decoration (see styles.css).
 */

interface Placement {
  top: string;
  left?: string;
  right?: string;
  size: string;
  rotate: number;
  flip?: boolean;
  opacity: number;
  duration: string;
  delay: string;
}

// Six hand-placed arrangements, one feather roughly every one to two screens
// of scroll depth (percentages are of the full page, not the viewport), so a
// long page carries several and a short one still gets two or three. Sizes
// stay large — never a small confetti scatter — per "I don't want him to be
// super small."
const ARRANGEMENTS: Placement[][] = [
  [
    {
      top: "-3%",
      left: "-6%",
      size: "26rem",
      rotate: -18,
      opacity: 0.319,
      duration: "14s",
      delay: "0s",
    },
    {
      top: "16%",
      right: "-9%",
      size: "22rem",
      rotate: 24,
      flip: true,
      opacity: 0.274,
      duration: "16s",
      delay: "-4s",
    },
    {
      top: "38%",
      left: "-7%",
      size: "24rem",
      rotate: -12,
      opacity: 0.296,
      duration: "15s",
      delay: "-2s",
    },
    {
      top: "58%",
      right: "-7%",
      size: "20rem",
      rotate: 20,
      flip: true,
      opacity: 0.274,
      duration: "17s",
      delay: "-6s",
    },
    {
      top: "78%",
      left: "-8%",
      size: "22rem",
      rotate: -26,
      opacity: 0.251,
      duration: "18s",
      delay: "-3s",
    },
  ],
  [
    {
      top: "-4%",
      right: "-7%",
      size: "30rem",
      rotate: 14,
      flip: true,
      opacity: 0.319,
      duration: "15s",
      delay: "0s",
    },
    {
      top: "22%",
      left: "-8%",
      size: "20rem",
      rotate: -30,
      opacity: 0.251,
      duration: "18s",
      delay: "-6s",
    },
    {
      top: "46%",
      right: "-6%",
      size: "24rem",
      rotate: 18,
      flip: true,
      opacity: 0.296,
      duration: "14s",
      delay: "-1s",
    },
    {
      top: "70%",
      left: "-7%",
      size: "22rem",
      rotate: -20,
      opacity: 0.274,
      duration: "16s",
      delay: "-5s",
    },
  ],
  [
    {
      top: "0%",
      left: "-8%",
      size: "24rem",
      rotate: -10,
      opacity: 0.296,
      duration: "13s",
      delay: "0s",
    },
    {
      top: "28%",
      right: "-8%",
      size: "22rem",
      rotate: 22,
      flip: true,
      opacity: 0.274,
      duration: "15s",
      delay: "-4s",
    },
    {
      top: "54%",
      left: "-6%",
      size: "20rem",
      rotate: -16,
      opacity: 0.251,
      duration: "17s",
      delay: "-2s",
    },
    {
      top: "80%",
      right: "-9%",
      size: "26rem",
      rotate: 12,
      flip: true,
      opacity: 0.319,
      duration: "16s",
      delay: "-7s",
    },
  ],
  [
    {
      top: "-2%",
      left: "6%",
      size: "20rem",
      rotate: -22,
      opacity: 0.274,
      duration: "14s",
      delay: "0s",
    },
    {
      top: "20%",
      right: "-8%",
      size: "26rem",
      rotate: 20,
      flip: true,
      opacity: 0.274,
      duration: "17s",
      delay: "-3s",
    },
    {
      top: "42%",
      left: "-6%",
      size: "18rem",
      rotate: -34,
      opacity: 0.228,
      duration: "19s",
      delay: "-8s",
    },
    {
      top: "64%",
      right: "-7%",
      size: "22rem",
      rotate: 16,
      flip: true,
      opacity: 0.296,
      duration: "15s",
      delay: "-2s",
    },
    {
      top: "86%",
      left: "-8%",
      size: "24rem",
      rotate: -14,
      opacity: 0.274,
      duration: "16s",
      delay: "-5s",
    },
  ],
  [
    {
      top: "-5%",
      right: "8%",
      size: "28rem",
      rotate: 8,
      flip: true,
      opacity: 0.319,
      duration: "15s",
      delay: "0s",
    },
    {
      top: "24%",
      left: "-7%",
      size: "22rem",
      rotate: -24,
      opacity: 0.274,
      duration: "17s",
      delay: "-4s",
    },
    {
      top: "50%",
      right: "-6%",
      size: "20rem",
      rotate: 18,
      flip: true,
      opacity: 0.251,
      duration: "14s",
      delay: "-1s",
    },
    {
      top: "72%",
      left: "-8%",
      size: "24rem",
      rotate: -10,
      opacity: 0.296,
      duration: "18s",
      delay: "-6s",
    },
  ],
  [
    {
      top: "-4%",
      left: "-7%",
      size: "22rem",
      rotate: -16,
      opacity: 0.296,
      duration: "16s",
      delay: "0s",
    },
    {
      top: "18%",
      right: "-6%",
      size: "20rem",
      rotate: 26,
      flip: true,
      opacity: 0.251,
      duration: "14s",
      delay: "-5s",
    },
    {
      top: "40%",
      left: "-9%",
      size: "26rem",
      rotate: -20,
      opacity: 0.319,
      duration: "17s",
      delay: "-2s",
    },
    {
      top: "62%",
      right: "-8%",
      size: "22rem",
      rotate: 14,
      flip: true,
      opacity: 0.274,
      duration: "15s",
      delay: "-7s",
    },
    {
      top: "84%",
      left: "-6%",
      size: "20rem",
      rotate: -28,
      opacity: 0.251,
      duration: "19s",
      delay: "-3s",
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
      className="pointer-events-none absolute inset-0 -z-[1] overflow-x-hidden"
    >
      {feathers.map((f, i) => (
        <span
          key={i}
          className="feather-ruffle absolute"
          style={{
            top: f.top,
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
