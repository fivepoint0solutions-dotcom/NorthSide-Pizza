/**
 * THE PLATFORM PILLARS
 *
 * SR Sidekick is a senior care and safety platform, not only a
 * conversation companion: orientation and safety sit alongside calm and
 * engagement. These six are the product's own framing — the adventure system
 * in `adventures.ts` is how the engagement half is entered day to day.
 */

export interface Pillar {
  slug: string;
  name: string;
  summary: string;
  icon: string;
  gradient: string;
  detail: string[];
  /** What the senior actually says or taps. */
  invocation: string;
}

export const PILLARS: Pillar[] = [
  {
    slug: "orientation",
    name: "Location Safety",
    summary: "Where you are, where you're going, and the way back home.",
    icon: "map-pin",
    gradient: "var(--grad-explore)",
    detail: [
      "“Right now: you are at home” — a plain answer, always on the first screen",
      "“Where am I?” and “What do I do next?” answered without anyone having to ask a person",
      "Directions to saved places: the doctor, the shop, a daughter's house",
      "Find Your Way Home, with the address read aloud and repeated as often as needed",
      "A caregiver can be shown location when the senior has agreed to it — and told plainly when they haven't",
    ],
    invocation: "“Where am I?”",
  },
  {
    slug: "people",
    name: "People Identifier",
    summary: "Who's who, with a face, a name and a relationship.",
    icon: "users",
    gradient: "var(--grad-family)",
    detail: [
      "Cards for the people who matter: daughter, son, neighbour, doctor",
      "Photo, name, relationship and phone number, in type you can read across a room",
      "Tap a card to call — no numbers, no contact list, no keypad",
      "Family or a caregiver keeps the cards current from their own phone",
      "Reduces the social distress of not being able to place a familiar face",
    ],
    invocation: "“Who is this?”",
  },
  {
    slug: "audio",
    name: "Audio Therapy",
    summary: "Nostalgia playlists and therapeutic audio, picked for one person.",
    icon: "music",
    gradient: "var(--grad-music)",
    detail: [
      "Songs picked just for you — curated to the eras that carry meaning",
      "Playlists a family member can add to, with a note about why",
      "Therapeutic audio streams for restlessness, sundowning and sleep",
      "Ultra-large transport controls, built for low dexterity and tremor",
      "Music as a route into memory, not only as entertainment",
    ],
    invocation: "“Play me something.”",
  },
  {
    slug: "engagement",
    name: "Brain Games",
    summary: "Word Find, Photo Match, Family Quiz, Crossword, Find Your Way Home.",
    icon: "puzzle",
    gradient: "var(--grad-games)",
    detail: [
      "Games pitched to the person, adjusting quietly rather than announcing a level",
      "Photo Match and Family Quiz built from the family's own photographs",
      "Word Find and Crossword, readable and unhurried",
      "Find Your Way Home — orientation practice that feels like a game, not a test",
      "Nothing scored against a norm, and no results reported as a clinical signal",
    ],
    invocation: "“Give me something to think about.”",
  },
  {
    slug: "schedule",
    name: "Schedule & Reminders",
    summary: "Today, in order, in words — and the nudge at the right moment.",
    icon: "calendar-check",
    gradient: "var(--grad-stories)",
    detail: [
      "The day laid out simply: what's happening, and what's next",
      "Medication and appointment reminders, spoken as well as shown",
      "Family and caregivers can add events from their own phone",
      "Birthdays and anniversaries surfaced before they're missed",
      "A memory journal of the day, to look back on in the evening",
    ],
    invocation: "“What's happening today?”",
  },
  {
    slug: "help",
    name: "Emergency Help",
    summary: "Call the caregiver, or request help, in one large tap.",
    icon: "life-buoy",
    gradient: "var(--grad-sunrise)",
    detail: [
      "Call Caregiver — one named person, one tap, their photo on the button",
      "Request Help — someone will talk with you, without needing the right words first",
      "“What's happening?” for the moments where the room stops making sense",
      "An escalation plan agreed in advance: who is contacted, for what, and how",
      "Emergency services signposted clearly — SR Sidekick never pretends to be one",
    ],
    invocation: "“I need help.”",
  },
];
