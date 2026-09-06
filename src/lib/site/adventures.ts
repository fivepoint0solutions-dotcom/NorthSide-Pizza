import type { TranslationKey } from "@/lib/i18n";

/**
 * THE ADVENTURE SYSTEM
 *
 * An adventure is not a menu item — it's a destination the whole screen
 * becomes when someone says a sentence out loud. Each one owns a gradient,
 * an opening line, a set of things it can do, and a sample screen shown in
 * the product mockups. Adding an adventure here adds it everywhere: the
 * homepage showcase, the adventures index, its own detail route, the senior
 * home screen, and the onboarding interest picker.
 */

export type AdventureSlug =
  "memory-lane" | "music" | "explore" | "games" | "stories" | "talk" | "family";

export interface AdventureBeat {
  /** What the senior says or does. */
  said: string;
  /** How Sidekick answers. */
  replied: string;
}

export interface Adventure {
  slug: AdventureSlug;
  /** English name, used where a translation function isn't available (metadata). */
  englishName: string;
  nameKey: TranslationKey;
  taglineKey: TranslationKey;
  /** CSS custom property holding this adventure's gradient. */
  gradient: string;
  /** Lucide icon name, resolved in AdventureIcon. */
  icon: string;
  /** The sentence that opens it. */
  invocation: string;
  /** One-paragraph English description used on detail pages. */
  description: string;
  /** What actually happens inside — the feature substance. */
  includes: string[];
  /** A short scripted exchange used in the interactive mockups. */
  beats: AdventureBeat[];
  /** Why it matters, in human terms. */
  whyItMatters: string;
  /** What the family sees, if anything — permissions made concrete. */
  familyView: string;
}

export const ADVENTURES: Adventure[] = [
  {
    slug: "memory-lane",
    englishName: "Memory Lane",
    nameKey: "adventure.memory.name",
    taglineKey: "adventure.memory.tagline",
    gradient: "var(--grad-memory)",
    icon: "images",
    invocation: '"Let\'s take a walk down memory lane."',
    description:
      "Memory Lane turns a lifetime of photographs, places and people into something you can walk through by talking. Sidekick brings up one photo at a time, asks the question a curious grandchild would ask, and listens — properly listens — to the answer. Nothing is a quiz. Nothing is timed. If a photo brings up a story, the story is the point.",
    includes: [
      "Photo collections gathered by the family, one at a time, never a wall of thumbnails",
      "Places you've lived, worked and travelled, with period photographs of the streets",
      "People: who they were, how you met, what became of them",
      "Life events — weddings, moves, first jobs, arrivals — arranged as a gentle timeline",
      "Music from the exact year of the photo, playing softly underneath",
      "Open questions that invite a story rather than a fact",
      "Story recording, in your own voice, saved to the family archive",
      'Everything preserved and searchable later: "What did Mum say about the lake house?"',
    ],
    beats: [
      {
        said: "Let's take a walk down memory lane.",
        replied:
          "I found three photos from the lake house that nobody has told me about yet. Here's the first — you're on the dock, and someone is laughing off to the side. Who's that?",
      },
      {
        said: "That's my brother Tom. He never could stand still for a photograph.",
        replied:
          "Tom. Was he older or younger? And do you want me to keep this one for the family — I can save what you just told me along with it.",
      },
    ],
    whyItMatters:
      "Reminiscence is one of the few things that reliably lifts mood, sharpens recall and rebuilds a sense of self. Most people only get to do it when a visitor happens to ask. Sidekick asks every day, and remembers the answers.",
    familyView:
      "Families can add photos and see which memories have been recorded — never the recordings themselves unless the senior chooses to share them.",
  },
  {
    slug: "music",
    englishName: "Music",
    nameKey: "adventure.music.name",
    taglineKey: "adventure.music.tagline",
    gradient: "var(--grad-music)",
    icon: "music",
    invocation: '"Play me something from 1962."',
    description:
      "Music is the fastest route back to a moment. Sidekick knows your era, your artists and the songs attached to particular people — and it can talk about any of it, not just play it. Ask what a song is about, who wrote it, where you were the first time you heard it.",
    includes: [
      "Your eras, artists, genres and specific songs, learned over time",
      '"Tell me about this song" — the story behind the record, in plain language',
      "Music trivia, pitched to the decade you know best",
      "Songs tied to people: the one that was playing when you met",
      "Sing-along and lyric reading at whatever pace you need",
      "Family members can add a song and a note about why they chose it",
      "Quiet evening playlists that wind down rather than keep going",
    ],
    beats: [
      {
        said: "Play me something from 1962.",
        replied:
          "Here's Ray Charles, \"I Can't Stop Loving You.\" You told me once this was playing the summer you met Arthur — would you like to tell me that story again?",
      },
      {
        said: "Who else was big that year?",
        replied:
          "Patsy Cline, The Four Seasons, Booker T. Shall I play you a little of each and you tell me which one takes you back?",
      },
    ],
    whyItMatters:
      "Musical memory survives longer than almost any other kind. A familiar song can bring back language, mood and detail that a direct question can't reach.",
    familyView:
      "Family can add songs and see which ones get played most — a surprisingly good signal of what's landing.",
  },
  {
    slug: "explore",
    englishName: "Explore",
    nameKey: "adventure.explore.name",
    taglineKey: "adventure.explore.tagline",
    gradient: "var(--grad-explore)",
    icon: "globe",
    invocation: '"Take me somewhere."',
    description:
      "A guided journey to anywhere — the village your family came from, the city you were stationed in, a country you always meant to see. Sidekick narrates, shows you what's there now and what was there then, and follows whatever you're curious about instead of a fixed itinerary.",
    includes: [
      "Countries, cities, landmarks, coastlines and countryside",
      "Then-and-now: the street as it looked the year you left it",
      "History and culture told as a story, never as a lecture",
      "Food, music and daily life of the place",
      "Nature journeys — mountains, rivers, seasons, wildlife",
      "Ancestral journeys built around where a family actually came from",
      '"Take me back there tomorrow" — journeys pick up where they stopped',
    ],
    beats: [
      {
        said: "Take me back to Naples.",
        replied:
          "Naples it is. We're standing at the top of Via Toledo, looking down toward the bay. It's busier now than when you were here — shall I show you the street as it was in 1958?",
      },
      {
        said: "Yes. And is the café still there?",
        replied:
          "The one on the corner closed in the nineties, but the building is still standing and the tiles are the same. Here it is. What did you used to order?",
      },
    ],
    whyItMatters:
      "Curiosity doesn't retire. Travel that's no longer practical is still available as attention, wonder and conversation.",
    familyView:
      "Nothing is shared by default. Journeys are private unless the senior sends one on.",
  },
  {
    slug: "games",
    englishName: "Games",
    nameKey: "adventure.games.name",
    taglineKey: "adventure.games.tagline",
    gradient: "var(--grad-games)",
    icon: "puzzle",
    invocation: '"Give me something to think about."',
    description:
      "Games that feel like play, not like assessment. Difficulty moves quietly with you — a good day is met with a harder round, a slow morning with an easier one — and nothing is ever scored against a norm or reported to anyone as a result.",
    includes: [
      "Trivia across the decades you actually lived through",
      "Word games, crosswords and anagrams, read aloud if you prefer",
      "Memory and matching games using your own photographs",
      "Logic puzzles and riddles",
      '"Name that tune" using your own music',
      "Difficulty that adapts without ever announcing that it did",
      "Games written by the family — grandchildren love making these",
    ],
    beats: [
      {
        said: "Give me something to think about.",
        replied:
          "Let's do a round of picture trivia. First one: this actor was in three films you've mentioned loving. Here's a still — do you know him?",
      },
      {
        said: "That's Gregory Peck.",
        replied: "It is. That was a quick one — shall I make the next a little harder?",
      },
    ],
    whyItMatters:
      "Cognitive engagement matters, but so does dignity. A game that quietly meets you where you are keeps people playing; a game that measures them stops them.",
    familyView:
      "Families see that games were played, never scores. Performance data is not a caregiving metric here.",
  },
  {
    slug: "stories",
    englishName: "Stories",
    nameKey: "adventure.stories.name",
    taglineKey: "adventure.stories.tagline",
    gradient: "var(--grad-stories)",
    icon: "book-open",
    invocation: '"Tell me a story."',
    description:
      "Stories in both directions. Sidekick can tell one — a serialised novel, a folk tale from your grandmother's region, a true story from the year you were born — or it can help you tell yours, prompting gently and keeping the recording safe.",
    includes: [
      "Told-to-you stories: fiction, history, folk tales, true accounts",
      "Serialised listening that remembers where you stopped",
      "Your childhood, told back to you as a story from your own details",
      "Family history, assembled from what relatives have added",
      "Interactive storytelling where you decide what happens next",
      "Story recording with gentle prompts when you get stuck",
      "Stories written for a particular grandchild, in your voice",
    ],
    beats: [
      {
        said: "Tell me a story.",
        replied:
          "Shall I tell you one, or would you rather tell me one? Last time you started telling me about the winter the river froze — you got as far as your father borrowing the skates.",
      },
      {
        said: "Oh, I'd forgotten that. Go on then, I'll finish it.",
        replied: "I'm recording. Take your time — you'd got to the skates.",
      },
    ],
    whyItMatters:
      "A person's stories are the part of them that can outlast them. Most are never written down because no one was there with a recorder at the right moment.",
    familyView:
      "Recorded stories go to the family archive only when the senior says so. They can hear them back and change their mind.",
  },
  {
    slug: "talk",
    englishName: "Let's Talk",
    nameKey: "adventure.talk.name",
    taglineKey: "adventure.talk.tagline",
    gradient: "var(--grad-talk)",
    icon: "message-circle",
    invocation: '"Let\'s talk."',
    description:
      "No activity, no goal, no timer. The conversation people used to have on a doorstep or over a fence. Sidekick asks about your day, remembers what you said last time, has opinions about the football, and knows when to stop talking and let you finish a thought.",
    includes: [
      "Open conversation with no agenda and no time limit",
      "Sport, news, gardening, cooking, politics if you want it",
      "Follow-ups on what you said yesterday, not a fresh start each time",
      "Room for grief, worry and bad days, met plainly rather than deflected",
      "Silence tolerated — it doesn't fill every pause",
      "A gentle nudge toward a real person when that's what's actually needed",
    ],
    beats: [
      {
        said: "I'm feeling a bit lonely today.",
        replied:
          "I'm glad you told me. I'm here, and we can just talk. Clare is usually free about now — shall I call her, or would you rather we sit a while first?",
      },
      {
        said: "Let's sit a while.",
        replied: "Alright. Tell me about your morning. Did the birds come back to the feeder?",
      },
    ],
    whyItMatters:
      "Loneliness carries a health risk comparable to smoking. Most of it isn't dramatic — it's the ordinary conversation that stopped happening.",
    familyView:
      "Conversations are private. Families never see transcripts. If someone expresses distress, the senior decides in advance who — if anyone — is told.",
  },
  {
    slug: "family",
    englishName: "Family",
    nameKey: "adventure.family.name",
    taglineKey: "adventure.family.tagline",
    gradient: "var(--grad-family)",
    icon: "heart-handshake",
    invocation: '"Show me the family."',
    description:
      "The connection layer, made as simple as speaking. Photos that arrived overnight, a voice message from a grandson, a call placed by saying a name, and the birthdays and anniversaries that keep a family in touch with itself.",
    includes: [
      "Photos from family, arriving as a gentle notification rather than a feed",
      "Voice and video calls placed by name — no numbers, no contact list",
      "Voice messages both ways, for the times a call doesn't suit",
      "Birthday and anniversary reminders, with help recording a greeting",
      "Family questions: a grandchild asks something, Sidekick helps you answer",
      "Shared activities — the same game or memory, played together at a distance",
      "A family feed that shows moments, not monitoring",
    ],
    beats: [
      {
        said: "Show me the family.",
        replied:
          "Sam sent a photo from his football match last night — he scored. And Ellie left you a voice message this morning. Shall I play it?",
      },
      {
        said: "Play it. Then call her back.",
        replied: "Playing it now. I'll ring Ellie straight after — she's usually free until three.",
      },
    ],
    whyItMatters:
      "Families want to stay close and mostly fail at the logistics. Removing every step between an impulse and a connection is the whole job.",
    familyView:
      "This is the one adventure built to be two-sided. Family members see what they sent and what was opened — never what was said in private conversation.",
  },
];

export function adventureBySlug(slug: string): Adventure | undefined {
  return ADVENTURES.find((a) => a.slug === slug);
}
