/** Privacy, safety, permissions and accessibility content. */

export interface Principle {
  title: string;
  body: string;
  icon: string;
}

export const PRIVACY_PRINCIPLES: Principle[] = [
  {
    title: "The senior owns their data",
    body: "Photos, stories, recordings and conversation history belong to the person using SR Sidekick. Not to the family who set it up, not to the community they live in, and not to us.",
    icon: "user-check",
  },
  {
    title: "Sharing is a decision, every time",
    body: 'Nothing leaves the senior\'s account by default. A recorded story is private until they say "send that to Clare." They can listen back and change their mind before it goes.',
    icon: "share-2",
  },
  {
    title: "Families see what they're given",
    body: "There is no hidden view. Whatever a family member can see is listed on the senior's own screen, in plain words, and can be switched off in one step.",
    icon: "eye-off",
  },
  {
    title: "Conversations are not a feed",
    body: 'Private conversation is never transcribed to a family dashboard. "She spoke with Sidekick for twenty minutes" is the most a family member ever sees, and only if permitted.',
    icon: "message-square-off",
  },
  {
    title: "We don't sell anything about anyone",
    body: "No advertising, no data brokerage, no third-party profiling. The plan you pay for is the entire business model.",
    icon: "ban",
  },
  {
    title: "Retention is finite and visible",
    body: "Conversation history is kept for as long as it's useful and then deleted on a schedule the account holder sets. Deleting an account deletes the data, including the backups, within thirty days.",
    icon: "timer",
  },
  {
    title: "Security you'd expect of a bank",
    body: "Encrypted in transit and at rest, independent penetration testing, least-privilege internal access, and audited logs for every support action.",
    icon: "shield-check",
  },
  {
    title: "Written in words people actually use",
    body: "Our privacy notice is one page of plain language before it is anything else. If a policy can't be explained to the person it's about, it isn't a policy — it's cover.",
    icon: "file-text",
  },
];

export const SAFETY_PRINCIPLES: Principle[] = [
  {
    title: "It is not a medical device",
    body: "SR Sidekick does not diagnose, monitor vital signs, dispense medical advice or replace any professional care. It says so, in its own voice, whenever a conversation heads that way.",
    icon: "stethoscope",
  },
  {
    title: "It is honest about being a companion",
    body: "It never claims to be a person, and it never pretends to be a specific person. Asked directly, it answers directly.",
    icon: "message-circle",
  },
  {
    title: "It knows its own limits",
    body: "Legal, financial and medical questions get the same reply: here's the general picture, and here's the person you should actually ask.",
    icon: "alert-circle",
  },
  {
    title: "It escalates rather than improvises",
    body: "Signs of crisis, distress or an emergency route to the escalation plan the household set up in advance — a named person, a service, or both — instead of being handled alone.",
    icon: "life-buoy",
  },
  {
    title: "The escalation plan is agreed in advance",
    body: "During setup, the senior chooses who is contacted, for what, and how. It's reviewed on a schedule and can be changed any time by voice.",
    icon: "clipboard-check",
  },
  {
    title: "It resists manipulation",
    body: "It won't help with financial decisions under pressure, won't relay requests for money or credentials, and flags scam patterns it recognises — a real and rising risk for older adults.",
    icon: "shield-alert",
  },
  {
    title: "Help, not surveillance",
    body: "Location safety and emergency help exist for the person using them: Sidekick always answers “where am I?” to them. Whether a caregiver also sees it is theirs to decide, and there is no silent watching either way.",
    icon: "map-pin",
  },
  {
    title: "Never a substitute for a visit",
    body: "The product is measured on whether human contact goes up. If a companion becomes a reason to visit less, it has failed at its job.",
    icon: "users",
  },
];

export interface PermissionRow {
  what: string;
  familyDefault: "always" | "with-permission" | "never";
  detail: string;
}

/** The permissions matrix, stated as a promise rather than a settings screen. */
export const PERMISSIONS: PermissionRow[] = [
  {
    what: "That they're up and using Sidekick today",
    familyDefault: "always",
    detail: "A presence signal — that the day has started. Not a timeline of it.",
  },
  {
    what: "Photos and messages the family sent",
    familyDefault: "always",
    detail: "Whether it was opened, and when. Families can already see what they sent.",
  },
  {
    what: "Upcoming birthdays, events and appointments",
    familyDefault: "always",
    detail: "Shared family calendar — added by anyone, visible to everyone invited.",
  },
  {
    what: "Which adventures were opened this week",
    familyDefault: "with-permission",
    detail: '"Music and Memory Lane" — the shape of the week, never the content.',
  },
  {
    what: "Stories and memories that were recorded",
    familyDefault: "with-permission",
    detail: "That one exists. Hearing it requires a separate, per-recording share.",
  },
  {
    what: "Reminders and whether they were acknowledged",
    familyDefault: "with-permission",
    detail: "Useful for medication and appointments; off unless the senior turns it on.",
  },
  {
    what: "Mood or wellbeing signals",
    familyDefault: "with-permission",
    detail: "Only ever a broad signal, and only to people the senior names.",
  },
  {
    what: "What was actually said in a conversation",
    familyDefault: "never",
    detail: "No transcripts, no summaries, no exceptions. Not available to families, staff or us.",
  },
  {
    what: "Where they are right now",
    familyDefault: "with-permission",
    detail:
      "Orientation is a core feature — Sidekick always tells the senior where they are. Whether a caregiver can also see it is the senior's decision, shown on their own screen and revocable by saying so.",
  },
  {
    what: "A history of everywhere they've been",
    familyDefault: "never",
    detail:
      "Location is answered in the moment — “you are at home”, “here's the way back”. No movement history is kept for anyone to scroll.",
  },
  {
    what: "Game scores and cognitive performance",
    familyDefault: "never",
    detail: "Not a clinical instrument, and not reported as one.",
  },
];

export const ACCESSIBILITY_COMMITMENTS: Principle[] = [
  {
    title: "Large type by default",
    body: "The senior experience starts at 24px and scales to 40 without reflow breaking. Larger text is the default state, not an accessibility mode.",
    icon: "type",
  },
  {
    title: "Contrast beyond the minimum",
    body: "Body text targets 7:1 rather than the 4.5:1 floor, and a dedicated high-contrast mode strips every decorative gradient.",
    icon: "contrast",
  },
  {
    title: "Targets you can hit",
    body: "Nothing tappable is smaller than 44px, most are 60px or larger, and spacing prevents the mis-tap that ends a session.",
    icon: "pointer",
  },
  {
    title: "Voice as a first-class input",
    body: "Every function in the product can be reached by speaking. Typing is optional everywhere, including setup.",
    icon: "mic",
  },
  {
    title: "Built for screen readers",
    body: "Semantic structure, correct landmarks and live-region announcements, tested with VoiceOver, NVDA and TalkBack.",
    icon: "ear",
  },
  {
    title: "Motion is a preference, not a fashion",
    body: "Respects the OS reduced-motion setting and offers its own calm mode for people who never found that setting.",
    icon: "wind",
  },
  {
    title: "Audio you can adjust",
    body: 'Speech pace, voice, volume and repetition are all adjustable by asking — "speak a bit slower" is a supported instruction.',
    icon: "volume-2",
  },
  {
    title: "Errors that help",
    body: "No dead ends and no error codes. If something fails, Sidekick says what happened and offers the next thing to try.",
    icon: "circle-help",
  },
  {
    title: "Tested with the people it's for",
    body: "Every release is tested with adults over seventy, including participants with low vision, hearing loss, tremor and early cognitive change.",
    icon: "users",
  },
];

/* ------------------------------------------------------------------ *
 * Memory, legacy and personalisation
 * ------------------------------------------------------------------ */

export const MEMORY_SYSTEM: Principle[] = [
  {
    title: "Photographs",
    body: "Added by family or scanned from a shoebox, tagged by conversation rather than by form-filling.",
    icon: "image",
  },
  {
    title: "Stories",
    body: "Recorded in their own voice, with permission asked each time and always revocable.",
    icon: "mic",
  },
  {
    title: "People",
    body: "Who's who, how they're related, and the details that make a question land warmly.",
    icon: "users",
  },
  {
    title: "Places",
    body: "Where they lived, worked, served and travelled — the geography of a life.",
    icon: "map-pin",
  },
  {
    title: "Dates",
    body: "Birthdays, anniversaries, and the private anniversaries that matter more.",
    icon: "calendar",
  },
  {
    title: "Preferences",
    body: "Music, food, humour, pace, how they like to be addressed and what they'd rather not discuss.",
    icon: "settings-2",
  },
  {
    title: "Family history",
    body: "Built up across relatives, so a grandchild's question has an answer.",
    icon: "git-branch",
  },
  {
    title: "Searchable",
    body: '"What did Mum say about the lake house?" returns the moment she said it.',
    icon: "search",
  },
];

export const LEGACY_ARTIFACTS: Principle[] = [
  {
    title: "Life story collections",
    body: "Recorded chapters assembled into a life, in the order it was lived.",
    icon: "book-open",
  },
  {
    title: "Family history archive",
    body: "One place the whole family contributes to and inherits.",
    icon: "archive",
  },
  {
    title: "Voice recordings",
    body: "Their actual voice, telling it their way. The part families say they miss most.",
    icon: "audio-lines",
  },
  {
    title: "Photo collections",
    body: "Annotated with what was actually happening, by the only person who knows.",
    icon: "images",
  },
  {
    title: "Milestones",
    body: "The dates and moments that shaped a family, kept somewhere they won't be lost.",
    icon: "flag",
  },
  {
    title: "Shareable keepsakes",
    body: "A printed book, an audio collection, or a private link for the family. Yours to keep, exportable at any time.",
    icon: "gift",
  },
];

export const PERSONALISATION: Principle[] = [
  {
    title: "What they enjoy",
    body: "Which adventures get opened, which get finished, and which quietly never do.",
    icon: "heart",
  },
  {
    title: "Conversation style",
    body: "Chatty or brief, teasing or gentle, mornings or evenings.",
    icon: "message-circle",
  },
  {
    title: "Difficulty",
    body: "Games and puzzles find the right level without ever announcing a change.",
    icon: "gauge",
  },
  {
    title: "Timing",
    body: "The suggestion arrives when they're usually receptive, not at nine sharp.",
    icon: "clock",
  },
  {
    title: "Subjects",
    body: "The topics that light them up get more room; the ones that don't, less.",
    icon: "sparkles",
  },
  {
    title: "Voice and pace",
    body: "Which voice, how fast, how much repetition — adjustable by asking.",
    icon: "mic-vocal",
  },
];
