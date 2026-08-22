import {
  BookOpen,
  Boxes,
  ClipboardList,
  Layers,
  type LucideIcon,
  MessageSquareHeart,
  PencilRuler,
  Sparkles,
  Wand2,
} from "lucide-react";
import type { CreationContext, CreationType, Mode } from "./ai";

export type FieldKind = "text" | "textarea" | "choice" | "slider";

export interface FieldConfig {
  key: keyof CreationContext;
  label: string;
  placeholder?: string;
  kind: FieldKind;
  options?: string[];
  required?: boolean;
  helper?: string;
}

export interface CreationTypeConfig {
  id: CreationType;
  label: string;
  tagline: string;
  icon: LucideIcon;
  defaultMode: Mode;
  fields: FieldConfig[];
}

export const GRADE_OPTIONS = [
  "K",
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
  "9th",
  "10th",
  "11th",
  "12th",
  "Mixed",
];

export const TIME_OPTIONS = ["15 min", "30 min", "45 min", "1 hour", "Multiple days"];

export const LEVEL_OPTIONS = [
  "Below grade level",
  "On grade level",
  "Above grade level",
  "Mixed levels",
];

export const TONE_OPTIONS = ["Warm & personal", "Professional", "Brief & efficient", "Celebratory"];

export const AUDIENCE_OPTIONS = [
  "Whole class",
  "One family",
  "Field trip / event",
  "Behavior update",
];

const gradeField: FieldConfig = {
  key: "grade",
  label: "Grade",
  kind: "choice",
  options: GRADE_OPTIONS,
  required: true,
};
const subjectField: FieldConfig = {
  key: "subject",
  label: "Subject",
  kind: "text",
  placeholder: "e.g. Science, 6th grade math, ELA…",
  required: true,
};
const topicField: FieldConfig = {
  key: "topic",
  label: "Topic",
  kind: "text",
  placeholder: "e.g. photosynthesis, fractions, the water cycle…",
  required: true,
};
const timeField: FieldConfig = {
  key: "timeAvailable",
  label: "Time available",
  kind: "choice",
  options: TIME_OPTIONS,
};
const objectiveField: FieldConfig = {
  key: "objective",
  label: "Learning objective",
  kind: "textarea",
  placeholder: "What should students walk away able to do? (optional — I can suggest one)",
};
const levelField: FieldConfig = {
  key: "studentLevel",
  label: "Student level",
  kind: "choice",
  options: LEVEL_OPTIONS,
};
const creativityField: FieldConfig = {
  key: "creativity",
  label: "Creativity level",
  kind: "slider",
  helper: "Play it safe ↔ Go wild",
};

export const CREATION_TYPES: CreationTypeConfig[] = [
  {
    id: "lesson",
    label: "Lesson",
    tagline: "A full lesson plan, built around your idea",
    icon: BookOpen,
    defaultMode: "build",
    fields: [
      gradeField,
      subjectField,
      topicField,
      timeField,
      objectiveField,
      levelField,
      creativityField,
    ],
  },
  {
    id: "activity",
    label: "Activity",
    tagline: "One engaging activity to drop into any lesson",
    icon: Boxes,
    defaultMode: "build",
    fields: [gradeField, subjectField, topicField, timeField, creativityField],
  },
  {
    id: "worksheet",
    label: "Worksheet",
    tagline: "Practice questions students can work through",
    icon: PencilRuler,
    defaultMode: "busywork",
    fields: [gradeField, subjectField, topicField, levelField],
  },
  {
    id: "quiz",
    label: "Quiz",
    tagline: "A short check for understanding, with an answer key",
    icon: ClipboardList,
    defaultMode: "busywork",
    fields: [gradeField, subjectField, topicField, timeField],
  },
  {
    id: "rubric",
    label: "Rubric",
    tagline: "Clear criteria for grading student work",
    icon: Layers,
    defaultMode: "busywork",
    fields: [
      gradeField,
      subjectField,
      topicField,
      {
        key: "keyPoints",
        label: "What matters most?",
        kind: "textarea",
        placeholder: "Optional — what should this rubric emphasize?",
      },
    ],
  },
  {
    id: "parent-message",
    label: "Parent Message",
    tagline: "A note home, in the right tone",
    icon: MessageSquareHeart,
    defaultMode: "busywork",
    fields: [
      {
        key: "audience",
        label: "Who's this for?",
        kind: "choice",
        options: AUDIENCE_OPTIONS,
        required: true,
      },
      topicField,
      { key: "tone", label: "Tone", kind: "choice", options: TONE_OPTIONS },
      {
        key: "keyPoints",
        label: "Anything specific to include?",
        kind: "textarea",
        placeholder: "Optional",
      },
    ],
  },
  {
    id: "brainstorm",
    label: "Brainstorm",
    tagline: "Explore ideas before committing to one",
    icon: Sparkles,
    defaultMode: "inspire",
    fields: [topicField, { key: "subject", label: "Subject (optional)", kind: "text" }],
  },
  {
    id: "other",
    label: "Something Else",
    tagline: "Tell me what you need in your own words",
    icon: Wand2,
    defaultMode: "build",
    fields: [
      {
        key: "idea",
        label: "Describe what you need",
        kind: "textarea",
        placeholder: "e.g. a sub plan for Friday, a bulletin board idea…",
        required: true,
      },
    ],
  },
];

export function creationTypeConfig(id: CreationType): CreationTypeConfig {
  return CREATION_TYPES.find((t) => t.id === id) ?? CREATION_TYPES[CREATION_TYPES.length - 1]!;
}
