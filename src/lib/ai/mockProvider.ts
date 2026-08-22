import type {
  AIProvider,
  BuildQuestion,
  ChatMemory,
  ChatReply,
  ContentBlock,
  CreationContext,
  CreationType,
  CritiqueResult,
  GenerationResult,
  IdeaOption,
  QuickAction,
} from "./types";

/**
 * Reference implementation of `AIProvider`.
 *
 * It's a template engine, not a model — it exists so the whole app (UI,
 * state, editing, saving) can be built and demoed without an API key.
 * Point `aiProvider` in `./index.ts` at a real model later and every
 * screen keeps working unchanged.
 */

let counter = 0;
function id(prefix: string) {
  counter += 1;
  return `${prefix}-${Date.now().toString(36)}-${counter}`;
}

function delay(min = 550, max = 1100) {
  const ms = min + Math.random() * (max - min);
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function pick<T>(arr: T[], seed = Math.random()): T {
  return arr[Math.floor(seed * arr.length) % arr.length] as T;
}

function sample<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  const out: T[] = [];
  while (out.length < n && copy.length) {
    const i = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(i, 1)[0] as T);
  }
  return out;
}

function topicOf(ctx: CreationContext) {
  return ctx.topic?.trim() || ctx.idea?.trim() || "this topic";
}

function subjectOf(ctx: CreationContext) {
  return ctx.subject?.trim() || "class";
}

function gradeOf(ctx: CreationContext) {
  const g = ctx.grade?.trim();
  if (!g || g === "Mixed") return "your";
  if (g === "K") return "kindergarten";
  return `${g}-grade`;
}

const APPROACHES = [
  "Hands-on",
  "Story-driven",
  "Discussion-based",
  "Game-based",
  "Visual & spatial",
  "Real-world connection",
  "Movement-based",
  "Collaborative",
  "Inquiry-led",
];

const HOOK_STARTERS = [
  (t: string) =>
    `Open with a two-minute mystery about ${t} and let students guess before you explain.`,
  (t: string) =>
    `Show two contrasting images or examples related to ${t} and ask "what's different?"`,
  (t: string) =>
    `Start with a quick show-of-hands poll connected to ${t} to surface what students already believe.`,
  (t: string) => `Tell a 90-second personal or historical story that leads naturally into ${t}.`,
  (t: string) => `Pose a "would you rather" scenario tied to ${t} and have students defend a side.`,
];

const ACTIVITY_STARTERS = [
  (t: string, g: string) =>
    `Small groups build a simple model or diagram that explains ${t} to ${g} classmates.`,
  (t: string) => `Students rotate through 3 stations, each exploring ${t} from a different angle.`,
  (t: string) =>
    `Pair students up for a "teach-back" where each explains one piece of ${t} to their partner.`,
  (t: string) => `Run a short simulation or role-play where students experience ${t} firsthand.`,
  (t: string) =>
    `Give students a real (or realistic) problem involving ${t} and 15 minutes to propose a solution.`,
];

const ASSESSMENT_STARTERS = [
  (t: string) =>
    `A 3-question exit ticket checking whether students can apply ${t}, not just recall it.`,
  (t: string) => `A one-sentence "explain it to a 5th grader" summary of ${t}.`,
  (t: string) =>
    `Thumbs up / sideways / down self-check on confidence with ${t}, followed by one clarifying question.`,
  (t: string) =>
    `A quick peer-review pass where students check one another's work on ${t} against 2 criteria.`,
];

const CLOSING_STARTERS = [
  (t: string) =>
    `Students write one thing that surprised them about ${t} on a sticky note for the door.`,
  (t: string) =>
    `Circle back to the opening hook and ask students to answer it now, knowing what they know about ${t}.`,
  (t: string) => `Quick round-robin: one word each to describe ${t} today.`,
];

function makeIdea(ctx: CreationContext, approach: string): IdeaOption {
  const t = topicOf(ctx);
  const g = gradeOf(ctx);
  const templates: Record<string, () => { title: string; description: string }> = {
    "Hands-on": () => ({
      title: `Build it: a hands-on model of ${t}`,
      description: `${g} students construct or manipulate something physical to make ${t} concrete before you name the vocabulary.`,
    }),
    "Story-driven": () => ({
      title: `The story behind ${t}`,
      description: `Frame ${t} as a narrative with a character, a problem, and a turning point — students follow the story to discover the concept.`,
    }),
    "Discussion-based": () => ({
      title: `Debate it: is ${t} always true?`,
      description: `Give students a claim about ${t} that's mostly-but-not-entirely true and let them argue it out in small groups.`,
    }),
    "Game-based": () => ({
      title: `Turn ${t} into a quick game`,
      description: `A lightweight, low-prep game (cards, points, or a race) where winning depends on understanding ${t}.`,
    }),
    "Visual & spatial": () => ({
      title: `Map it out: a visual walk through ${t}`,
      description: `Students sketch, diagram, or physically arrange objects to represent the structure of ${t}.`,
    }),
    "Real-world connection": () => ({
      title: `Where ${t} shows up outside class`,
      description: `Anchor ${t} to something students already encounter — a job, a hobby, or the news — before formalizing it.`,
    }),
    "Movement-based": () => ({
      title: `Get moving: act out ${t}`,
      description: `Students physically move around the room to represent parts of ${t}, then reflect on what the movement showed them.`,
    }),
    Collaborative: () => ({
      title: `Jigsaw ${t} across the room`,
      description: `Each small group masters one piece of ${t} and teaches it to a reshuffled group.`,
    }),
    "Inquiry-led": () => ({
      title: `Let them ask first`,
      description: `Show a puzzling example related to ${t} and have students generate the questions before you give any answers.`,
    }),
  };
  const gen = templates[approach] ?? templates["Hands-on"]!;
  const { title, description } = gen();
  return { id: id("idea"), title, approach, description };
}

function makeBlocks(ctx: CreationContext): ContentBlock[] {
  const t = topicOf(ctx);
  const g = gradeOf(ctx);
  const time = ctx.timeAvailable?.trim() || "one class period";
  return [
    { id: id("blk"), heading: "Hook", body: pick(HOOK_STARTERS)(t) },
    {
      id: id("blk"),
      heading: "Learning objective",
      body:
        ctx.objective?.trim() ||
        `By the end of ${time}, students will be able to explain and apply ${t} in a new example.`,
    },
    { id: id("blk"), heading: "Main activity", body: pick(ACTIVITY_STARTERS)(t, g) },
    { id: id("blk"), heading: "Check for understanding", body: pick(ASSESSMENT_STARTERS)(t) },
    { id: id("blk"), heading: "Closing", body: pick(CLOSING_STARTERS)(t) },
  ];
}

function makeWorksheet(ctx: CreationContext): ContentBlock[] {
  const t = topicOf(ctx);
  return [
    {
      id: id("blk"),
      heading: "Instructions",
      body: `Work through the questions below about ${t}. Show your thinking, not just your answer.`,
    },
    {
      id: id("blk"),
      heading: "Warm-up",
      body: `1. In your own words, what does "${t}" mean?\n2. Give one example of ${t} you've seen before.`,
    },
    {
      id: id("blk"),
      heading: "Practice",
      body: `3. Apply ${t} to solve the following problem: [insert scenario here]\n4. Explain why your approach works.\n5. What would change if one detail of the problem were different?`,
    },
    {
      id: id("blk"),
      heading: "Challenge (optional)",
      body: `6. Create your own example that uses ${t} and swap with a partner to solve.`,
    },
  ];
}

function makeQuiz(ctx: CreationContext): ContentBlock[] {
  const t = topicOf(ctx);
  return [
    {
      id: id("blk"),
      heading: "Directions",
      body: `Choose the best answer for each question about ${t}. You have ${ctx.timeAvailable?.trim() || "15 minutes"}.`,
    },
    {
      id: id("blk"),
      heading: "Question 1 (multiple choice)",
      body: `Which statement best describes ${t}?\nA) [option]\nB) [option]\nC) [option]\nD) [option]`,
    },
    {
      id: id("blk"),
      heading: "Question 2 (short answer)",
      body: `Explain one situation where ${t} applies, in 2-3 sentences.`,
    },
    {
      id: id("blk"),
      heading: "Question 3 (applied)",
      body: `Given [a short scenario], use ${t} to solve it and show your work.`,
    },
  ];
}

function makeAnswerKey(ctx: CreationContext): ContentBlock[] {
  const t = topicOf(ctx);
  return [
    {
      id: id("blk"),
      heading: "Answer key",
      body: `1. [Correct answer + why it's correct]\n2. [Model short answer touching on ${t}]\n3. [Worked solution]`,
    },
    {
      id: id("blk"),
      heading: "Common mistakes to watch for",
      body: `Students often confuse ${t} with a related-but-different idea — award partial credit for reasoning that's on the right track.`,
    },
  ];
}

function makeRubric(ctx: CreationContext): ContentBlock[] {
  const t = topicOf(ctx);
  return [
    {
      id: id("blk"),
      heading: "Criterion: Understanding",
      body: `4 — Explains ${t} accurately and in depth.\n3 — Explains ${t} with minor gaps.\n2 — Shows partial understanding of ${t}.\n1 — Little to no understanding shown.`,
    },
    {
      id: id("blk"),
      heading: "Criterion: Application",
      body: `4 — Applies ${t} correctly to a new situation.\n3 — Applies ${t} with small errors.\n2 — Attempts application with significant errors.\n1 — Does not attempt application.`,
    },
    {
      id: id("blk"),
      heading: "Criterion: Communication",
      body: `4 — Work is clear, organized, and well explained.\n3 — Work is mostly clear.\n2 — Work is hard to follow in places.\n1 — Work is difficult to understand.`,
    },
  ];
}

function makeParentMessage(ctx: CreationContext): ContentBlock[] {
  const t = topicOf(ctx);
  const tone = ctx.tone?.trim() || "warm and clear";
  return [
    {
      id: id("blk"),
      heading: "Subject line",
      body: `A quick update from ${subjectOf(ctx)} class`,
    },
    {
      id: id("blk"),
      heading: "Message",
      body: `Hi families,\n\nThis week we've been exploring ${t} in class. ${ctx.keyPoints?.trim() ? ctx.keyPoints.trim() + " " : ""}Your student can practice by explaining ${t} to you in their own words tonight.\n\nThanks for your support at home.\n\nWarmly,\n[Your name]`,
    },
    {
      id: id("blk"),
      heading: "Tone note",
      body: `Written to sound ${tone} — adjust freely to match your voice.`,
    },
  ];
}

function makeActivity(ctx: CreationContext): ContentBlock[] {
  const t = topicOf(ctx);
  return [
    {
      id: id("blk"),
      heading: "Setup",
      body: `Materials and grouping for a ${t} activity — adjust to what you have on hand.`,
    },
    { id: id("blk"), heading: "Directions", body: pick(ACTIVITY_STARTERS)(t, gradeOf(ctx)) },
    {
      id: id("blk"),
      heading: "Debrief question",
      body: `What did this activity reveal about ${t} that you didn't expect?`,
    },
  ];
}

function makeOther(ctx: CreationContext): ContentBlock[] {
  const t = topicOf(ctx);
  return [
    {
      id: id("blk"),
      heading: "Draft",
      body: `Here's a starting point for ${t} — tell me more about what you need and I'll reshape it.`,
    },
  ];
}

function generatorFor(type: CreationType): (ctx: CreationContext) => ContentBlock[] {
  switch (type) {
    case "lesson":
      return makeBlocks;
    case "worksheet":
      return makeWorksheet;
    case "quiz":
      return makeQuiz;
    case "rubric":
      return makeRubric;
    case "parent-message":
      return makeParentMessage;
    case "activity":
      return makeActivity;
    case "brainstorm":
      return makeOther;
    default:
      return makeOther;
  }
}

const BUILD_QUESTIONS: ((ctx: CreationContext) => BuildQuestion)[] = [
  (ctx) => ({
    id: id("q"),
    prompt: `What matters most for this lesson on ${topicOf(ctx)} — depth on one idea, or covering more ground?`,
    choices: ["Go deep on one idea", "Cover more ground", "Not sure yet — suggest one"],
  }),
  (ctx) => ({
    id: id("q"),
    prompt: `How do you want ${gradeOf(ctx)} students to spend most of their time?`,
    choices: ["Talking to each other", "Working independently", "Making or building something"],
  }),
  () => ({
    id: id("q"),
    prompt: "Is there a specific misconception you want to head off?",
    choices: ["Yes — I'll add it as I edit", "No particular one", "Not sure"],
  }),
];

const STRENGTH_TEMPLATES = [
  (t: string) =>
    `The core idea around ${t} is clear and gives students something concrete to hold onto.`,
  (t: string) =>
    `There's a natural hook here — students will likely connect ${t} to something familiar.`,
  () => `The structure leaves room for students to do the thinking rather than just receive it.`,
];

const CONSIDERATION_TEMPLATES = [
  (t: string) =>
    `It's not yet clear how you'll know a struggling student has actually grasped ${t} versus just gone through the motions.`,
  (t: string) =>
    `The pacing may be tight if students need more time to process ${t} than expected — worth a built-in checkpoint.`,
  () =>
    `Consider whether every student has an entry point, or whether this favors students who are already comfortable speaking up.`,
];

const QUESTION_TEMPLATES = [
  (t: string) =>
    `What will you do in the moment if half the class already understands ${t} and half doesn't?`,
  () => `What does success look like here — for you, not just for a rubric?`,
  (t: string) =>
    `Is there a simpler version of ${t} you could start with for students who need it?`,
];

const ALTERNATIVE_TEMPLATES = [
  (t: string) =>
    `You could flip the order — let students grapple with a problem involving ${t} before you name the concept.`,
  (t: string) =>
    `Consider a smaller-group version so quieter students have more room to think out loud about ${t}.`,
  () =>
    `A shorter, tighter version focused on one clear win might serve you better than covering everything today.`,
];

const ORDINAL_GRADE: Record<string, string> = {
  kindergarten: "K",
  kinder: "K",
  "1": "1st",
  "2": "2nd",
  "3": "3rd",
  "4": "4th",
  "5": "5th",
  "6": "6th",
  "7": "7th",
  "8": "8th",
  "9": "9th",
  "10": "10th",
  "11": "11th",
  "12": "12th",
};

function extractGrade(message: string): string | undefined {
  const m =
    message.match(/grade\s*(\d{1,2}|k(?:indergarten)?)\b/i) ??
    message.match(/(\d{1,2})(?:st|nd|rd|th)\s*grade/i);
  if (!m) return undefined;
  const raw = (m[1] ?? "").toLowerCase();
  return ORDINAL_GRADE[raw] ?? raw;
}

function extractTopic(message: string): string | undefined {
  const patterns = [
    /teach(?:ing)?\s+(?:my\s+\w+\s+)?(?:students?\s+)?([a-z0-9][a-z0-9 ,'-]{2,60}?)(?:\s+to\b|\s+for\b|\.|,|$)/i,
    /(?:about|on)\s+([a-z0-9][a-z0-9 ,'-]{2,60}?)(?:\.|,|$)/i,
    /idea for (?:an?|my)\s+([a-z0-9 ,'-]{2,60}?)(?:\.|,|$| but)/i,
  ];
  for (const p of patterns) {
    const m = message.match(p);
    if (m?.[1]) return m[1].trim();
  }
  return undefined;
}

type ChatIntent = "inspire" | "build" | "busywork" | "challenge";

function classifyIntent(message: string): ChatIntent {
  const m = message.toLowerCase();
  if (/challenge|weak(ness)?|flaw|missing|second opinion|critique|poke holes|what.?s wrong/.test(m))
    return "challenge";
  if (/three (different )?(ways|approaches|options)|multiple approaches|give me options/.test(m))
    return "inspire";
  if (/bored|boring|fun|engaging|exciting|spice up|creative way/.test(m)) return "inspire";
  if (/worksheet|quiz|rubric|parent (message|email|note)|answer key/.test(m)) return "busywork";
  return "build";
}

const ENCOURAGERS = [
  "Good starting point.",
  "That's a solid thread to pull on.",
  "I like where this is headed.",
  "Nice — plenty to work with here.",
];

async function generateIdeas(ctx: CreationContext): Promise<IdeaOption[]> {
  await delay();
  const approaches = sample(APPROACHES, 4);
  return approaches.map((a) => makeIdea(ctx, a));
}

async function generateCritique(ideaText: string, ctx: CreationContext): Promise<CritiqueResult> {
  await delay(700, 1300);
  const t = ideaText.trim() ? "your idea" : topicOf(ctx);
  return {
    strengths: sample(STRENGTH_TEMPLATES, 2).map((f) => f(t)),
    considerations: sample(CONSIDERATION_TEMPLATES, 2).map((f) => f(t)),
    questions: sample(QUESTION_TEMPLATES, 2).map((f) => f(t)),
    alternatives: sample(ALTERNATIVE_TEMPLATES, 2).map((f) => f(t)),
  };
}

export const mockProvider: AIProvider = {
  async converse(message, memory) {
    await delay(300, 650);
    const grade = extractGrade(message) ?? memory.context.grade;
    const topic =
      extractTopic(message) ?? (memory.awaiting ? message.trim() : memory.context.topic);
    const context: CreationContext = {
      ...memory.context,
      ...(grade && { grade }),
      ...(topic && { topic }),
    };

    // Resolving a question we asked last turn.
    if (
      memory.awaiting === "grade-objective-for-build" ||
      memory.awaiting === "topic-for-inspire"
    ) {
      const resolvedTopic = topic ?? message.trim();
      const ideas = await generateIdeas({ ...context, topic: resolvedTopic });
      return {
        text: "Based on that, I have three approaches. Pick one, combine them, or tell me to head in a completely different direction.",
        suggestions: ideas.map((idea) => ({
          label: idea.title,
          mode: "build",
          context: {
            ...context,
            topic: resolvedTopic,
            idea: `${idea.title} — ${idea.description}`,
          },
        })),
        memory: { context: { ...context, topic: resolvedTopic } },
      };
    }

    if (memory.awaiting === "lesson-for-challenge") {
      const critique = await generateCritique(message, context);
      return {
        text: `Here's one thing you might want to consider: ${critique.considerations[0]}`,
        suggestions: [
          {
            label: "See the full breakdown",
            mode: "challenge",
            challengeText: message,
            critique,
            context,
          },
        ],
        memory: { context },
      };
    }

    const intent = classifyIntent(message);

    if (intent === "challenge") {
      const looksLikeContent = message.split(/\s+/).length > 12;
      if (!looksLikeContent) {
        return {
          text: "Happy to take a look. Paste the lesson or idea here, or describe it in a sentence or two, and I'll point out what's worth a second look.",
          suggestions: [],
          memory: { context, awaiting: "lesson-for-challenge" },
        };
      }
      const critique = await generateCritique(message, context);
      return {
        text: `Here's one thing you might want to consider: ${critique.considerations[0]} There's also real strength here — ${critique.strengths[0]?.toLowerCase()}`,
        suggestions: [
          {
            label: "See the full breakdown",
            mode: "challenge",
            challengeText: message,
            critique,
            context,
          },
        ],
        memory: { context },
      };
    }

    if (intent === "inspire") {
      if (!topic) {
        return {
          text: "I can do that. What's the topic or lesson you'd like fresh angles on?",
          suggestions: [],
          memory: { context, awaiting: "topic-for-inspire" },
        };
      }
      const ideas = await generateIdeas({ ...context, topic });
      return {
        text: `${pick(ENCOURAGERS)} Here are a few different angles on ${topic} — none of these are finished lessons, just directions worth trying.`,
        suggestions: ideas.map((idea) => ({
          label: idea.title,
          mode: "build",
          context: { ...context, topic, idea: `${idea.title} — ${idea.description}` },
          ideas,
        })),
        memory: { context: { ...context, topic } },
      };
    }

    if (intent === "busywork") {
      return {
        text: `Sure — I can put together a ${topic ? "draft on " + topic : "first draft"} for you to look over and adjust. Want me to take a first pass?`,
        suggestions: [{ label: "Take a first pass", mode: "busywork", context }],
        memory: { context },
      };
    }

    // build
    if (!topic || !grade) {
      return {
        text: "Great — what grade are you teaching, and what should students be able to do by the end?",
        suggestions: [],
        memory: { context, awaiting: "grade-objective-for-build" },
      };
    }
    return {
      text: "Here's where I'd start — want to build this out together, step by step?",
      suggestions: [{ label: "Build this with me", mode: "build", context }],
      memory: { context },
    };
  },

  async inspire(ctx) {
    return generateIdeas(ctx);
  },

  async buildQuestion(ctx, askedCount) {
    await delay(350, 700);
    if (askedCount >= 2) return null;
    const gen = BUILD_QUESTIONS[askedCount % BUILD_QUESTIONS.length]!;
    return gen(ctx);
  },

  async buildDraft(ctx, _answers) {
    await delay();
    const t = topicOf(ctx);
    return {
      summaryTitle: `${t[0]!.toUpperCase()}${t.slice(1)} — draft lesson`,
      blocks: makeBlocks(ctx),
    };
  },

  async busywork(type, ctx) {
    await delay();
    const t = topicOf(ctx);
    return {
      summaryTitle: `${t[0]!.toUpperCase()}${t.slice(1)} — ${type.replace("-", " ")}`,
      blocks: generatorFor(type)(ctx),
    };
  },

  async challenge(ideaText, ctx) {
    return generateCritique(ideaText, ctx);
  },

  async applyQuickAction(action, blocks, ctx) {
    await delay(400, 850);
    const t = topicOf(ctx);
    switch (action) {
      case "more-creative":
        return blocks.map((b) => ({
          ...b,
          body: `${b.body}\n\nCreative twist: reframe this as a challenge, mystery, or story moment tied to ${t}.`,
        }));
      case "simpler":
        return blocks.map((b) => ({
          ...b,
          body: b.body.split("\n")[0] ?? b.body,
        }));
      case "more-challenging":
        return blocks.map((b) => ({
          ...b,
          body: `${b.body}\n\nStretch: ask students to justify their reasoning or apply ${t} to an unfamiliar example.`,
        }));
      case "different-approach": {
        const approach = pick(APPROACHES);
        const idea = makeIdea(ctx, approach);
        return [{ id: id("blk"), heading: idea.title, body: idea.description }, ...blocks.slice(1)];
      }
      case "improve":
        return blocks.map((b) => ({
          ...b,
          body: `${b.body}\n\nSharper version: be explicit about what students should notice or do first.`,
        }));
      case "boring-parts":
        return blocks.map((b) =>
          /instruction|direction|format|answer key/i.test(b.heading)
            ? { ...b, body: `${b.body}\n\n(Formatted and ready to hand out.)` }
            : b,
        );
      case "three-approaches":
      default:
        return blocks;
    }
  },
};
