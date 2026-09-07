/**
 * The eight card-gradient variants, in a fixed cycling order. Any grid of
 * cards should call `cardTint(index)` per item rather than reaching for one
 * tint class for the whole grid — that's what kept every card in a section
 * looking identical. Cycling through all eight means neighbours are always
 * different, and with an 8-long cycle a row rarely repeats one either.
 */
const CARD_TINTS = [
  "", // the default --grad-card (rose → lavender → blue)
  "card-tint-memory",
  "card-tint-cool",
  "card-tint-warm",
  "card-tint-dawn",
  "card-tint-dusk",
  "card-tint-meadow",
  "card-tint-twilight",
] as const;

export function cardTint(index: number): string {
  return CARD_TINTS[((index % CARD_TINTS.length) + CARD_TINTS.length) % CARD_TINTS.length]!;
}
