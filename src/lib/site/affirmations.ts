/**
 * The affirmations that surface on the senior's home screen.
 *
 * In the product these change through the day rather than sitting on one
 * line forever — so the screen never reads as a static poster — and family
 * can add their own to the list. Written in the second person, warm without
 * being saccharine, and never about the product.
 */
export const AFFIRMATIONS: string[] = [
  "You are safe, you are cherished, you are home.",
  "Your family is always thinking of you.",
  "You are loved more than words can say.",
  "We are so proud to call you ours.",
  "There is nowhere you need to be but here.",
  "The people who love you are only a tap away.",
  "You have made a difference to more people than you know.",
  "Today can be a quiet one. That's allowed.",
  "Your stories are worth telling, and someone is listening.",
  "You are exactly where you are supposed to be.",
];

/** The affirmation for a given tick, wrapping at the end of the list. */
export function affirmationAt(index: number): string {
  const length = AFFIRMATIONS.length;
  return AFFIRMATIONS[((index % length) + length) % length]!;
}
