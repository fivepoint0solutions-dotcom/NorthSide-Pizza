/**
 * Stand-in photography for the product demos.
 *
 * In the shipping product every one of these comes from the senior's own
 * library — family and pets added by whoever holds the caregiver code, and
 * places they like. These URLs exist so the marketing demo shows the real
 * behaviour; swap this one list when it's wired to an account.
 */
export interface DemoPhoto {
  src: string;
  /** Who or what it is, for the demo's own labelling. */
  label: string;
}

export const DEMO_PHOTOS: DemoPhoto[] = [
  {
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    label: "Sarah",
  },
  {
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    label: "David",
  },
  {
    src: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=300&q=80",
    label: "Biscuit",
  },
  {
    src: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80",
    label: "Jean",
  },
  {
    src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80",
    label: "The Marina",
  },
  {
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=300&q=80",
    label: "Dr. Patel",
  },
];

export function demoPhoto(index: number): string {
  const length = DEMO_PHOTOS.length;
  return DEMO_PHOTOS[((index % length) + length) % length]!.src;
}
