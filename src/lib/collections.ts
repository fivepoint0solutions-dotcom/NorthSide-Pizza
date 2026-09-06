/**
 * Small helpers for reading from content arrays under
 * `noUncheckedIndexedAccess`, so components can rely on a first/nth item
 * without threading `undefined` through every render path.
 */

export function firstOf<T>(items: readonly T[]): T {
  const [first] = items;
  if (first === undefined) throw new Error("Expected a non-empty collection");
  return first;
}

/** Element at `index`, clamped into range. Throws only on an empty array. */
export function at<T>(items: readonly T[], index: number): T {
  if (items.length === 0) throw new Error("Expected a non-empty collection");
  const clamped = Math.min(Math.max(index, 0), items.length - 1);
  const item = items[clamped];
  if (item === undefined) throw new Error("Expected a defined element");
  return item;
}
