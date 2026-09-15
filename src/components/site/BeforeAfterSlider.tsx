import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  alt: string;
  className?: string;
};

/**
 * Drag-to-reveal before/after comparison. Position is a percentage clamped
 * to [0, 100]; pointer capture keeps dragging smooth past the frame edge.
 */
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "Before",
  afterLabel = "After",
  alt,
  className,
}: BeforeAfterSliderProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    updateFromClientX(e.clientX);
  };

  const stopDragging = () => setDragging(false);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5));
    if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 5));
  };

  return (
    <div
      ref={frameRef}
      className={cn("ba-frame aspect-[4/3] select-none sm:aspect-[16/10]", className)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerLeave={stopDragging}
      role="slider"
      tabIndex={0}
      aria-label={`${alt} before and after comparison`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      onKeyDown={onKeyDown}
    >
      <img src={afterSrc} alt={`${alt} — after`} className="ba-image" draggable={false} />
      <img
        src={beforeSrc}
        alt={`${alt} — before`}
        className="ba-image"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        draggable={false}
      />

      <span className="badge-pill absolute left-3 top-3 bg-black/60 text-white backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="badge-pill absolute right-3 top-3 bg-[var(--brand-orange)] text-black">
        {afterLabel}
      </span>

      <div className="ba-handle" style={{ left: `${position}%` }} />
    </div>
  );
}

export default BeforeAfterSlider;
