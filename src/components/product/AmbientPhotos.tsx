import { cn } from "@/lib/utils";

/**
 * The app's ambient background: the photos that matter to the person using
 * it — family, pets, the things they like — drifting slowly up behind the
 * interface and fading out at the top.
 *
 * In the shipping product these come from the senior's own library (family
 * uploads, pets, music, saved activities). The URLs below are stand-ins so
 * the marketing demo shows the real behaviour; swap PHOTOS for the live
 * source when this is wired to an account.
 *
 * Six at a time, each on its own slow timer with a staggered negative
 * delay, so they never drift in formation.
 */

interface Drift {
  src: string;
  /** px — kept between 80 and 140, matching the product. */
  size: number;
  left: string;
  top: string;
  duration: string;
  delay: string;
}

const PHOTOS = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=300&q=80",
];

const DRIFTS: Drift[] = [
  { src: PHOTOS[0]!, size: 124, left: "8%", top: "22%", duration: "24s", delay: "0s" },
  { src: PHOTOS[1]!, size: 96, left: "62%", top: "12%", duration: "27s", delay: "-6s" },
  { src: PHOTOS[2]!, size: 112, left: "70%", top: "54%", duration: "21s", delay: "-13s" },
  { src: PHOTOS[3]!, size: 84, left: "16%", top: "62%", duration: "26s", delay: "-3s" },
  { src: PHOTOS[4]!, size: 104, left: "44%", top: "78%", duration: "23s", delay: "-17s" },
  { src: PHOTOS[5]!, size: 92, left: "34%", top: "36%", duration: "28s", delay: "-9s" },
];

export function AmbientPhotos({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      data-decorative="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {DRIFTS.map((drift, index) => (
        <img
          key={index}
          src={drift.src}
          alt=""
          loading="lazy"
          decoding="async"
          className="photo-drift absolute rounded-full object-cover shadow-raised"
          style={{
            width: drift.size,
            height: drift.size,
            left: drift.left,
            top: drift.top,
            ["--drift-duration" as string]: drift.duration,
            ["--drift-delay" as string]: drift.delay,
          }}
        />
      ))}
    </div>
  );
}

export default AmbientPhotos;
