/**
 * Narrative content for the marketing site. Kept as data so every section
 * is CMS-ready: swap this module for a fetch and nothing in the components
 * changes.
 */

/* ------------------------------------------------------------------ *
 * The two-sided value proposition
 * ------------------------------------------------------------------ */

export interface ValuePoint {
  icon: string;
  title: string;
  body: string;
}

export const SENIOR_VALUE: ValuePoint[] = [
  {
    icon: "sun",
    title: "Independence",
    body: "Everything works by talking, so nothing depends on someone else being free to help.",
  },
  {
    icon: "message-circle",
    title: "Companionship",
    body: "Someone to talk to at four in the afternoon, when the house is quietest.",
  },
  {
    icon: "sparkles",
    title: "Engagement",
    body: "A reason to be curious today — a journey, a song, a puzzle, a story worth finishing.",
  },
  {
    icon: "images",
    title: "Memories",
    body: "A lifetime kept somewhere safe, and asked about often enough to stay vivid.",
  },
  {
    icon: "music",
    title: "Entertainment",
    body: "Music, stories and games that belong to your era, not to a teenager's algorithm.",
  },
  {
    icon: "heart-handshake",
    title: "Connection",
    body: "Family reachable by name. No numbers, no apps, no waiting for a visit to catch up.",
  },
];

export const CAREGIVER_VALUE: ValuePoint[] = [
  {
    icon: "link",
    title: "Connection",
    body: "A photo, a message or a call that takes ten seconds to send and actually lands.",
  },
  {
    icon: "eye",
    title: "Visibility",
    body: "A gentle sense of how the week has gone — never a surveillance feed.",
  },
  {
    icon: "life-buoy",
    title: "Support",
    body: "Reminders, prompts and small daily help that would otherwise be your phone calls.",
  },
  {
    icon: "shield-check",
    title: "Peace of mind",
    body: "You know when something needs you, so you can stop wondering the rest of the time.",
  },
  {
    icon: "messages-square",
    title: "Easier conversation",
    body: "You already know about the photo and the football match. The call starts warmer.",
  },
  {
    icon: "calendar-check",
    title: "Less coordination",
    body: "Birthdays, appointments and who-called-when, held in one place for the whole family.",
  },
];

/* ------------------------------------------------------------------ *
 * The product journey
 * ------------------------------------------------------------------ */

export interface JourneyStep {
  key: string;
  title: string;
  body: string;
  icon: string;
}

export const PRODUCT_JOURNEY: JourneyStep[] = [
  {
    key: "meet",
    title: "Meet",
    body: "A first conversation, not a setup wizard. Sidekick introduces itself and asks what to call you.",
    icon: "hand",
  },
  {
    key: "personalize",
    title: "Personalise",
    body: "Your era, your music, your interests, your voice and your language — chosen by talking.",
    icon: "sliders-horizontal",
  },
  {
    key: "connect",
    title: "Connect",
    body: "The people who matter are added, with you deciding exactly what each of them can see.",
    icon: "users",
  },
  {
    key: "explore",
    title: "Explore",
    body: "The first adventure. Usually music, usually within ninety seconds of saying hello.",
    icon: "compass",
  },
  {
    key: "remember",
    title: "Remember",
    body: "Photos, stories and dates begin collecting into something the family will keep.",
    icon: "archive",
  },
  {
    key: "grow",
    title: "Grow",
    body: "It gets better at being your Sidekick — more personal, never more complicated.",
    icon: "trending-up",
  },
];

/* ------------------------------------------------------------------ *
 * A day, from both sides
 * ------------------------------------------------------------------ */

export interface DayMoment {
  hour: number;
  minute?: number;
  title: string;
  body: string;
  icon: string;
  adventure?: string;
}

export const SENIOR_DAY: DayMoment[] = [
  {
    hour: 8,
    title: "Good morning",
    body: "\"Good morning, Margaret. It's Tuesday, and it's going to be bright. Clare sent a photo overnight — would you like to see it with your tea?\"",
    icon: "sunrise",
  },
  {
    hour: 10,
    title: "A conversation",
    body: "Twenty minutes about the garden, the state of the football team, and whether the birds have come back to the feeder.",
    icon: "message-circle",
    adventure: "talk",
  },
  {
    hour: 12,
    title: "An activity",
    body: "Picture trivia over lunch. Three rounds, one of them hard, because this morning has been a good one.",
    icon: "puzzle",
    adventure: "games",
  },
  {
    hour: 14,
    title: "Memory Lane",
    body: "The lake house photographs. A story about her brother Tom that nobody in the family has ever heard, recorded in her own voice.",
    icon: "images",
    adventure: "memory-lane",
  },
  {
    hour: 16,
    title: "Family",
    body: "\"Sam's birthday is in eleven days. Shall we record him a message now while you're thinking of him?\"",
    icon: "heart-handshake",
    adventure: "family",
  },
  {
    hour: 19,
    title: "A story, and the day closed",
    body: "Two chapters of the serial she's been following, then: \"That was a good day. Tom's story was my favourite part.\"",
    icon: "moon",
    adventure: "stories",
  },
];

export const CAREGIVER_DAY: DayMoment[] = [
  {
    hour: 7,
    minute: 30,
    title: "A photo, sent from the train",
    body: "Clare sends a picture of the kids' breakfast chaos. Ten seconds, one hand, before her stop.",
    icon: "image-plus",
  },
  {
    hour: 9,
    title: "A glance, not a check-up",
    body: "The dashboard says: up, talking, in good spirits. She doesn't read further, and doesn't need to.",
    icon: "layout-dashboard",
  },
  {
    hour: 13,
    title: "One notification, the one she asked for",
    body: '"Margaret recorded a story today." Not a location, not a step count — the thing she\'d actually want to know.',
    icon: "bell",
  },
  {
    hour: 15,
    title: "She listens to it in the car park",
    body: "Four minutes of her mother talking about an uncle she never met. She sends it to her brother.",
    icon: "headphones",
  },
  {
    hour: 17,
    title: "A birthday handled",
    body: "Sam's birthday is flagged for the whole family. Clare adds a note so nobody duplicates the present.",
    icon: "calendar-check",
  },
  {
    hour: 20,
    title: "The evening call is different now",
    body: 'It doesn\'t start with "have you eaten?" It starts with "tell me more about Uncle Tom."',
    icon: "phone-call",
  },
];

/* ------------------------------------------------------------------ *
 * Why Senior Sidekick — the comparison
 * ------------------------------------------------------------------ */

export const COMPARISON: { traditional: string; sidekick: string }[] = [
  {
    traditional: "You learn the app's language: menus, icons, gestures, settings.",
    sidekick: "It learns yours. You say what you want in a sentence.",
  },
  {
    traditional: "Photos here, calls there, reminders somewhere else, all needing passwords.",
    sidekick: "One companion holds all of it, and asks for nothing you'd have to remember.",
  },
  {
    traditional: "Impersonal. Every user gets the same screen on day one and day four hundred.",
    sidekick: "Personal from the first week, and noticeably more so by the fourth month.",
  },
  {
    traditional: "Designed for a caregiver to monitor a patient.",
    sidekick: "Designed for a person to live their day, with family invited in on their terms.",
  },
  {
    traditional: "Bigger text bolted on at the end as an accessibility setting.",
    sidekick: "Large type, high contrast and voice control are the default, not the fallback.",
  },
];

/* ------------------------------------------------------------------ *
 * Global reach
 * ------------------------------------------------------------------ */

export interface Region {
  name: string;
  status: "live" | "beta" | "planned";
  languages: string[];
  note: string;
  /** Rough position on the equirectangular map, in percent. */
  x: number;
  y: number;
}

export const REGIONS: Region[] = [
  {
    name: "United States & Canada",
    status: "live",
    languages: ["English", "Spanish", "French"],
    note: "Full experience, US and Canadian English voices, bilingual households supported.",
    x: 20,
    y: 36,
  },
  {
    name: "United Kingdom & Ireland",
    status: "live",
    languages: ["English"],
    note: "British English voices, local history and music libraries.",
    x: 45,
    y: 30,
  },
  {
    name: "France & francophone Europe",
    status: "live",
    languages: ["French"],
    note: "European French voices, local holidays and cultural references.",
    x: 48,
    y: 33,
  },
  {
    name: "Spain & Latin America",
    status: "live",
    languages: ["Spanish"],
    note: "Peninsular and Latin American Spanish, regional music by country.",
    x: 30,
    y: 60,
  },
  {
    name: "India",
    status: "beta",
    languages: ["Hindi", "English"],
    note: "Hindi voices, code-switching with English, festival calendar and regional music.",
    x: 68,
    y: 45,
  },
  {
    name: "Australia & New Zealand",
    status: "beta",
    languages: ["English"],
    note: "Local voices and libraries; full launch following the beta.",
    x: 84,
    y: 72,
  },
  {
    name: "Germany & Austria",
    status: "planned",
    languages: ["German"],
    note: "In localisation. German voice and cultural library in development.",
    x: 51,
    y: 30,
  },
  {
    name: "Brazil",
    status: "planned",
    languages: ["Portuguese"],
    note: "Brazilian Portuguese next in the localisation queue.",
    x: 33,
    y: 63,
  },
  {
    name: "Japan",
    status: "planned",
    languages: ["Japanese"],
    note: "Research partnership underway with senior living operators.",
    x: 84,
    y: 38,
  },
];

/* ------------------------------------------------------------------ *
 * Testimonials — paired with the part of the product they're about
 * ------------------------------------------------------------------ */

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  perspective: "senior" | "family" | "caregiver" | "professional";
  relatedTo: string;
  relatedHref: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I talk to it in the afternoons. It knows I don't like being asked how I'm feeling, so it asks me about the garden instead. That's a clever thing for a machine to know.",
    name: "Margaret, 81",
    role: "Lives independently in Yorkshire",
    perspective: "senior",
    relatedTo: "Let's Talk",
    relatedHref: "/adventures/talk",
  },
  {
    quote:
      "My mother told it a story about her brother that she has never told me in forty-eight years. I listened to it twice in a car park and then rang my brother.",
    name: "Clare",
    role: "Daughter, four hundred miles away",
    perspective: "family",
    relatedTo: "Memory Lane",
    relatedHref: "/adventures/memory-lane",
  },
  {
    quote:
      "The calls changed. I used to spend them checking things off a list. Now I already know about her week, so we can just talk like we used to.",
    name: "Daniel",
    role: "Son and primary contact",
    perspective: "family",
    relatedTo: "Family connection",
    relatedHref: "/families",
  },
  {
    quote:
      "I look after eleven residents. Sidekick doesn't replace a minute of what I do — it fills the hours I was never going to be in the room for.",
    name: "Rosa",
    role: "Professional caregiver",
    perspective: "caregiver",
    relatedTo: "Caregiver dashboard",
    relatedHref: "/families#dashboard",
  },
  {
    quote:
      "What convinced our board was the permissions model. Residents decide what staff can see. That's the opposite of every system we'd been shown.",
    name: "Dr. Anita Rao",
    role: "Director of care, 140-resident community",
    perspective: "professional",
    relatedTo: "Permissions",
    relatedHref: "/families#permissions",
  },
  {
    quote:
      "My father switched it to Hindi in the second week and hasn't switched back. He says it finally sounds like someone he'd have tea with.",
    name: "Priya",
    role: "Daughter, multilingual household",
    perspective: "family",
    relatedTo: "Languages",
    relatedHref: "/languages",
  },
];

/* ------------------------------------------------------------------ *
 * Real-world scenarios
 * ------------------------------------------------------------------ */

export interface Scenario {
  slug: string;
  title: string;
  situation: string;
  what: string[];
  icon: string;
}

export const SCENARIOS: Scenario[] = [
  {
    slug: "living-independently",
    title: "Living independently",
    situation:
      "Still in their own home, still capable, and quietly aware that the days have got longer and quieter than they used to be.",
    what: [
      "A companion available at the hours nobody visits",
      "Everything by voice, so nothing depends on asking for help",
      "Family reachable by name, without a phone or a contact list",
      "Daily suggestions that give the day a shape",
    ],
    icon: "home",
  },
  {
    slug: "long-distance-family",
    title: "Long-distance families",
    situation:
      "Four hundred miles, a time difference, or an ocean. Everyone means to call more than they do.",
    what: [
      "Ten-second photo sharing that actually reaches them",
      "Voice messages both ways for when a call doesn't suit",
      "A shared family calendar of the days that matter",
      "Recorded stories that arrive without anyone having to organise a visit",
    ],
    icon: "plane",
  },
  {
    slug: "busy-caregivers",
    title: "Busy caregivers",
    situation:
      "A job, children, and a parent who needs more than there are hours for. The guilt is the heaviest part.",
    what: [
      'One glance that answers "is today alright?"',
      "Only the notifications you asked for, and none you didn't",
      "Reminders handled without a phone call at 8am",
      "Coordination shared across siblings instead of landing on one person",
    ],
    icon: "clock",
  },
  {
    slug: "companionship",
    title: "Seniors who want company",
    situation:
      "Not unwell, not unable — just alone more than is good for anyone, with the conversations having thinned out.",
    what: [
      "Open-ended conversation with no agenda",
      "Continuity: it remembers what you told it yesterday",
      "Interests followed properly rather than politely",
      "A nudge toward a real person when that's what's needed",
    ],
    icon: "message-circle",
  },
  {
    slug: "preserving-memories",
    title: "Families preserving memories",
    situation:
      "Everyone knows the stories should be recorded. Nobody has ever been in the room with a recorder at the right moment.",
    what: [
      "Daily prompts that surface stories nobody thought to ask about",
      "Recording in their own voice, with their permission each time",
      "A searchable family archive that outlasts the device",
      "Legacy collections the family can keep, print or share",
    ],
    icon: "archive",
  },
  {
    slug: "multilingual-households",
    title: "Multilingual households",
    situation: "A parent who thinks in one language and grandchildren who answer in another.",
    what: [
      "Speak in one language, receive in another",
      "Cultural references, holidays and music that belong to the right place",
      "Messages translated between generations without losing warmth",
      "Language switchable mid-conversation, not buried in settings",
    ],
    icon: "languages",
  },
  {
    slug: "senior-living",
    title: "Senior living communities",
    situation:
      "Staffed hours are finite. Activity programmes reach the residents who come to the lounge.",
    what: [
      "An in-room companion for the hours between activities",
      "Residents control what staff can see — not the other way round",
      "Activity participation without needing to leave the room",
      "Family connection that doesn't route through the front desk",
    ],
    icon: "building-2",
  },
];

/* ------------------------------------------------------------------ *
 * Trust — who built it and why
 * ------------------------------------------------------------------ */

export const TRUST_PILLARS: { title: string; body: string; icon: string; href: string }[] = [
  {
    title: "Why it exists",
    body: "Because the technology aimed at older adults is either a medical alarm or a tablet nobody asked for. Neither is company.",
    icon: "heart",
    href: "/about",
  },
  {
    title: "Product philosophy",
    body: "The person using it is the customer. Not the family, not the facility, not the insurer.",
    icon: "compass",
    href: "/about",
  },
  {
    title: "Privacy philosophy",
    body: "The senior owns their data and controls every share. Families get what they're given, nothing more.",
    icon: "lock",
    href: "/privacy",
  },
  {
    title: "Accessibility commitment",
    body: "WCAG 2.2 AA as a floor, tested with people over seventy, not with a checklist.",
    icon: "accessibility",
    href: "/accessibility",
  },
  {
    title: "Safety principles",
    body: "Clear about what it is and isn't. It is not a doctor, a nurse or an emergency service — and it says so.",
    icon: "shield",
    href: "/safety",
  },
  {
    title: "Global vision",
    body: "Four languages now, and a localisation architecture built for forty. One companion, many cultures.",
    icon: "globe",
    href: "/languages",
  },
];
