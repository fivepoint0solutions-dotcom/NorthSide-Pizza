/** FAQ, resources and support content. */

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqGroup {
  audience: string;
  icon: string;
  items: FaqItem[];
}

export const FAQ_GROUPS: FaqGroup[] = [
  {
    audience: "For seniors",
    icon: "user",
    items: [
      {
        q: "Do I need to be good with technology?",
        a: "No. If you can say a sentence out loud, you can use all of it. There is nothing to type, no passwords to remember and no menus to learn. Setup is done by talking, and someone in your family can sit with you the first time if you'd like.",
      },
      {
        q: "What if I don't know what to ask it?",
        a: 'You don\'t have to. Sidekick opens the day with a suggestion — a song, a photo, a question — and you can ignore all of them and just talk. "What should we do today?" is a complete instruction.',
      },
      {
        q: "Is someone listening to my conversations?",
        a: "No. What you say to Sidekick in a private conversation is not sent to your family, your care home or anyone else. There are no transcripts in the family dashboard, and no setting that would create one.",
      },
      {
        q: "Can I turn things off?",
        a: "Everything, at any time, by saying so. You can switch off individual permissions, mute notifications, change what your family sees, or stop using a feature entirely without losing anything else.",
      },
      {
        q: "Will it try to replace my family?",
        a: "The opposite. It is built to increase how often you hear from people — it will suggest calling your daughter far more often than it will suggest talking to it.",
      },
    ],
  },
  {
    audience: "For families",
    icon: "users",
    items: [
      {
        q: "Can I see what my parent is doing?",
        a: "You see what they choose to share. By default that's a presence signal, the photos and messages you sent, and the shared calendar. Everything else — activities, recorded stories, reminders — is theirs to grant, and theirs to revoke.",
      },
      {
        q: "Can I set it up remotely?",
        a: "Yes. You can add photos, people, dates and preferences from your own phone before the first conversation, so it already knows the family on day one. The final permission choices are made by the senior.",
      },
      {
        q: "What if they don't take to it?",
        a: "Thirty days free, and cancellation takes one step. In practice the first week is the one that matters — the households that stay are almost always the ones where a family member added ten photos and three songs before the first conversation.",
      },
      {
        q: "How many of us can be connected?",
        a: "One person on the Senior plan, eight on Family. Each person gets their own permission settings, so a daughter who coordinates care and a grandson who sends photos see different things.",
      },
      {
        q: "Will it tell me if something's wrong?",
        a: "Within the escalation plan agreed during setup. Sidekick can call a named person when help is requested, or when a conversation suggests distress, and can share where they are if the senior has agreed to that. What it will not do is watch continuously: there is no movement history, no health monitoring and no fall detection.",
      },
    ],
  },
  {
    audience: "Privacy & safety",
    icon: "shield",
    items: [
      {
        q: "Who owns the data?",
        a: "The senior. Photos, stories, recordings and history belong to their account, are exportable at any time, and are deleted with the account — backups included — within thirty days.",
      },
      {
        q: "Is anything sold or used for advertising?",
        a: "No. There is no advertising, no data brokerage and no third-party profiling. Subscriptions are the entire business model.",
      },
      {
        q: "Does it know where they are?",
        a: "Yes — that is one of the things it is for. It answers “where am I?” plainly, gives directions to saved places, and can walk someone home. Whether a family member can also see their location is a separate, explicit permission the senior sets and can revoke by saying so.",
      },
      {
        q: "Is it a medical device?",
        a: "No, and it says so itself when a conversation heads that way. It does not diagnose, monitor vital signs or give medical advice, and it is not a substitute for professional care or emergency services.",
      },
      {
        q: "What happens in an emergency?",
        a: "It follows the escalation plan set up at the start: contacting a named person, directing to emergency services, or both. It never attempts to handle a medical emergency alone.",
      },
      {
        q: "Could a scammer use it?",
        a: "It refuses to relay requests for money or credentials, won't assist with financial decisions made under pressure, and flags recognised scam patterns to the senior and, if permitted, to a named family member.",
      },
    ],
  },
  {
    audience: "Languages & regions",
    icon: "languages",
    items: [
      {
        q: "Which languages are available?",
        a: "English, French, Spanish and Hindi at launch, with German, Portuguese and Japanese in localisation. Each is a full localisation — voice, conversation, activities, stories, dates and cultural references — not a translated menu.",
      },
      {
        q: "Can it switch languages mid-conversation?",
        a: 'Yes. Say "parlons en français" and it continues in French. It also supports asymmetric conversation: speak in one language and hear replies in another, which multilingual households use constantly.',
      },
      {
        q: "Does it know our holidays and music?",
        a: "Each localisation carries its own cultural library — holidays, music by era and region, food, history and naming conventions. A Hindi user's Memory Lane is not an English one with the words swapped.",
      },
      {
        q: "Where is it available?",
        a: "Live in the US, Canada, UK, Ireland, France, Spain and Latin America. In beta in India, Australia and New Zealand. See the map on the Languages page for the current roadmap.",
      },
    ],
  },
  {
    audience: "Technology",
    icon: "credit-card",
    items: [
      {
        q: "What does it run on?",
        a: "Any tablet, phone or smart display the household already owns, and a preconfigured tablet if they'd rather not choose one. Nothing needs installing beyond an app, and the senior never sees an update prompt.",
      },
      {
        q: "Does it need a good internet connection?",
        a: "It needs a connection, but it's built for a slow one. Conversation degrades gracefully, and cached music, stories and photos keep working through a brief outage.",
      },
    ],
  },
];

export interface Resource {
  title: string;
  kind: string;
  audience: string;
  minutes: number;
  summary: string;
  icon: string;
}

export const RESOURCES: Resource[] = [
  {
    title: "The first week: getting a companion to stick",
    kind: "Guide",
    audience: "Families",
    minutes: 8,
    summary:
      "What the households that stay do differently in the first seven days. Mostly: ten photos and three songs, added before the first conversation.",
    icon: "sparkles",
  },
  {
    title: "How to ask a parent about their life",
    kind: "Guide",
    audience: "Families",
    minutes: 11,
    summary:
      'The questions that open people up, the ones that close them down, and why "what was it like?" beats "do you remember?"',
    icon: "message-circle",
  },
  {
    title: "Talking about technology without condescension",
    kind: "Guide",
    audience: "Families",
    minutes: 6,
    summary:
      "How to introduce something new to a parent without the conversation becoming about capability.",
    icon: "heart-handshake",
  },
  {
    title: "A caregiver's guide to doing less coordination",
    kind: "Guide",
    audience: "Caregivers",
    minutes: 9,
    summary: "Splitting the load across siblings, and which reminders are worth automating.",
    icon: "clipboard-list",
  },
  {
    title: "Preserving a life story before it's urgent",
    kind: "Guide",
    audience: "Families",
    minutes: 12,
    summary: "A practical order to record things in, and what families regret not capturing.",
    icon: "archive",
  },
  {
    title: "Setting up permissions you'll all be comfortable with",
    kind: "Guide",
    audience: "Families",
    minutes: 7,
    summary:
      "How to have the visibility conversation once, properly, so it doesn't recur every month.",
    icon: "shield-check",
  },
  {
    title: "Loneliness: what the research actually says",
    kind: "Research",
    audience: "Everyone",
    minutes: 14,
    summary:
      "The health evidence on social isolation in later life, and what companionship can and cannot address.",
    icon: "book-open",
  },
  {
    title: "Accessible technology for low vision and hearing loss",
    kind: "Guide",
    audience: "Seniors",
    minutes: 10,
    summary: "Settings worth changing on any device, not only ours.",
    icon: "accessibility",
  },
  {
    title: "Fifty things to talk to your Sidekick about",
    kind: "List",
    audience: "Seniors",
    minutes: 5,
    summary: "For anyone who finds the blank page harder than the conversation.",
    icon: "list",
  },
  {
    title: "Running a multilingual household",
    kind: "Guide",
    audience: "Families",
    minutes: 8,
    summary: "Keeping a grandparent's language alive across generations that answer in another.",
    icon: "languages",
  },
  {
    title: "Introducing Sidekick in a care community",
    kind: "Playbook",
    audience: "Professionals",
    minutes: 16,
    summary: "Rollout sequencing, staff training and the resident consent conversation.",
    icon: "building-2",
  },
  {
    title: "Spotting and stopping scams aimed at older adults",
    kind: "Guide",
    audience: "Everyone",
    minutes: 9,
    summary: "The current patterns, and how to build a household rule that holds under pressure.",
    icon: "shield-alert",
  },
];

export interface SupportChannel {
  title: string;
  body: string;
  action: string;
  icon: string;
}

export const SUPPORT_CHANNELS: SupportChannel[] = [
  {
    title: "Help centre",
    body: "Step-by-step answers, in large type, with a voice-read option on every article.",
    action: "Browse help articles",
    icon: "circle-help",
  },
  {
    title: "Talk to a person",
    body: "A phone number answered by a human, seven days a week, with no menu tree in front of it.",
    action: "See phone hours",
    icon: "phone",
  },
  {
    title: "Accessibility support",
    body: "A dedicated line for setup with low vision, hearing loss, tremor or cognitive change.",
    action: "Accessibility help",
    icon: "accessibility",
  },
  {
    title: "Account & billing",
    body: "Plan changes, invoices, cancellations and data export, handled in one conversation.",
    action: "Manage account",
    icon: "credit-card",
  },
  {
    title: "Caregiver support",
    body: "For the person coordinating: permissions, multiple family members, and handover.",
    action: "Caregiver help",
    icon: "users",
  },
  {
    title: "Language support",
    body: "Help in English, French, Spanish and Hindi, from people who speak them.",
    action: "Choose a language",
    icon: "languages",
  },
];
