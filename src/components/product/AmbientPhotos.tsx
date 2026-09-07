import { DEMO_PHOTOS } from "@/lib/site/demoPhotos";
import { cn } from "@/lib/utils";

/**
 * The app's ambient background: the photos that matter to the person using
 * it — family, pets, the things they like — drifting slowly up behind the
 * interface and fading out at the top.
 *
 * `photos` is whatever source is in play: DEMO_PHOTOS by default, the
 * senior's own library once this is wired to an account, or files a visitor
 * picked from their own device (see the picker in ProductShowcase). Fewer
 * photos than placements just means the list repeats.
 *
 * Six on screen at a time, each on its own slow timer with a staggered
 * negative delay, so they never drift in formation.
 */

interface Placement {
  /** px — kept between 80 and 140, matching the product. */
  size: number;
  left: string;
  top: string;
  duration: string;
  delay: string;
}

const PLACEMENTS: Placement[] = [
  { size: 124, left: "8%", top: "22%", duration: "24s", delay: "0s" },
  { size: 96, left: "62%", top: "12%", duration: "27s", delay: "-6s" },
  { size: 112, left: "70%", top: "54%", duration: "21s", delay: "-13s" },
  { size: 84, left: "16%", top: "62%", duration: "26s", delay: "-3s" },
  { size: 104, left: "44%", top: "78%", duration: "23s", delay: "-17s" },
  { size: 92, left: "34%", top: "36%", duration: "28s", delay: "-9s" },
];

export function AmbientPhotos({
  photos,
  className,
}: {
  photos?: string[] | undefined;
  className?: string;
}) {
  const sources = photos?.length ? photos : DEMO_PHOTOS.map((photo) => photo.src);

  return (
    <div
      aria-hidden="true"
      data-decorative="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {PLACEMENTS.map((placement, index) => (
        <img
          key={index}
          src={sources[index % sources.length]}
          alt=""
          loading="lazy"
          decoding="async"
          className="photo-drift absolute rounded-full object-cover shadow-raised"
          style={{
            width: placement.size,
            height: placement.size,
            left: placement.left,
            top: placement.top,
            ["--drift-duration" as string]: placement.duration,
            ["--drift-delay" as string]: placement.delay,
          }}
        />
      ))}
    </div>
  );
}

export default AmbientPhotos;
