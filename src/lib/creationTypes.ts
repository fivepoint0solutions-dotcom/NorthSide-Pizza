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
import { useT, type TranslationKey, type TFunction } from "./i18n";
import type { CreationContext, CreationType, Mode } from "./ai";

export type FieldKind = "text" | "textarea" | "choice" | "slider";

/** Raw field definition — label/placeholder/helper are translation keys, resolved via resolveField(). */
interface FieldMeta {
  key: keyof CreationContext;
  labelKey: TranslationKey;
  placeholderKey?: TranslationKey;
  helperKey?: TranslationKey;
  kind: FieldKind;
  options?: string[];
  required?: boolean;
}

export interface FieldConfig {
  key: keyof CreationContext;
  label: string;
  placeholder?: string;
  helper?: string;
  kind: FieldKind;
  options?: string[];
  required?: boolean;
}

interface CreationTypeMeta {
  id: CreationType;
  icon: LucideIcon;
  defaultMode: Mode;
  fields: FieldMeta[];
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

const gradeField: FieldMeta = {
  key: "grade",
  labelKey: "field.grade.label",
  kind: "choice",
  options: GRADE_OPTIONS,
  required: true,
};
const subjectField: FieldMeta = {
  key: "subject",
  labelKey: "field.subject.label",
  kind: "text",
  placeholderKey: "field.subject.placeholder",
  required: true,
};
const topicField: FieldMeta = {
  key: "topic",
  labelKey: "field.topic.label",
  kind: "text",
  placeholderKey: "field.topic.placeholder",
  required: true,
};
const timeField: FieldMeta = {
  key: "timeAvailable",
  labelKey: "field.timeAvailable.label",
  kind: "choice",
  options: TIME_OPTIONS,
};
const objectiveField: FieldMeta = {
  key: "objective",
  labelKey: "field.objective.label",
  kind: "textarea",
  placeholderKey: "field.objective.placeholder",
};
const levelField: FieldMeta = {
  key: "studentLevel",
  labelKey: "field.studentLevel.label",
  kind: "choice",
  options: LEVEL_OPTIONS,
};
const creativityField: FieldMeta = {
  key: "creativity",
  labelKey: "field.creativity.label",
  kind: "slider",
  helperKey: "field.creativity.helper",
};

export const CREATION_TYPES_META: CreationTypeMeta[] = [
  {
    id: "lesson",
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
    icon: Boxes,
    defaultMode: "build",
    fields: [gradeField, subjectField, topicField, timeField, creativityField],
  },
  {
    id: "worksheet",
    icon: PencilRuler,
    defaultMode: "busywork",
    fields: [gradeField, subjectField, topicField, levelField],
  },
  {
    id: "quiz",
    icon: ClipboardList,
    defaultMode: "busywork",
    fields: [gradeField, subjectField, topicField, timeField],
  },
  {
    id: "rubric",
    icon: Layers,
    defaultMode: "busywork",
    fields: [
      gradeField,
      subjectField,
      topicField,
      {
        key: "keyPoints",
        labelKey: "field.rubricKeyPoints.label",
        kind: "textarea",
        placeholderKey: "field.rubricKeyPoints.placeholder",
      },
    ],
  },
  {
    id: "parent-message",
    icon: MessageSquareHeart,
    defaultMode: "busywork",
    fields: [
      {
        key: "audience",
        labelKey: "field.audience.label",
        kind: "choice",
        options: AUDIENCE_OPTIONS,
        required: true,
      },
      topicField,
      { key: "tone", labelKey: "field.tone.label", kind: "choice", options: TONE_OPTIONS },
      {
        key: "keyPoints",
        labelKey: "field.parentKeyPoints.label",
        kind: "textarea",
        placeholderKey: "field.parentKeyPoints.placeholder",
      },
    ],
  },
  {
    id: "brainstorm",
    icon: Sparkles,
    defaultMode: "inspire",
    fields: [topicField, { key: "subject", labelKey: "field.subjectOptional.label", kind: "text" }],
  },
  {
    id: "other",
    icon: Wand2,
    defaultMode: "build",
    fields: [
      {
        key: "idea",
        labelKey: "field.idea.label",
        kind: "textarea",
        placeholderKey: "field.idea.placeholder",
        required: true,
      },
    ],
  },
];

function resolveField(field: FieldMeta, t: TFunction): FieldConfig {
  return {
    key: field.key,
    label: t(field.labelKey),
    placeholder: field.placeholderKey ? t(field.placeholderKey) : undefined,
    helper: field.helperKey ? t(field.helperKey) : undefined,
    kind: field.kind,
    options: field.options,
    required: field.required,
  };
}

function typeLabelKey(id: CreationType): TranslationKey {
  const camel = id === "parent-message" ? "parentMessage" : id;
  return `types.${camel}.label` as TranslationKey;
}

function typeTaglineKey(id: CreationType): TranslationKey {
  const camel = id === "parent-message" ? "parentMessage" : id;
  return `types.${camel}.tagline` as TranslationKey;
}

export function creationTypeMeta(id: CreationType): CreationTypeMeta {
  return (
    CREATION_TYPES_META.find((t) => t.id === id) ??
    CREATION_TYPES_META[CREATION_TYPES_META.length - 1]!
  );
}

function resolveType(meta: CreationTypeMeta, t: TFunction): CreationTypeConfig {
  return {
    id: meta.id,
    label: t(typeLabelKey(meta.id)),
    tagline: t(typeTaglineKey(meta.id)),
    icon: meta.icon,
    defaultMode: meta.defaultMode,
    fields: meta.fields.map((f) => resolveField(f, t)),
  };
}

/** Translated creation-type config for a single type — use inside components. */
export function useCreationTypeConfig(id: CreationType): CreationTypeConfig {
  const t = useT();
  return resolveType(creationTypeMeta(id), t);
}

/** Translated creation-type configs, optionally filtered to a subset of ids. */
export function useCreationTypes(ids?: CreationType[]): CreationTypeConfig[] {
  const t = useT();
  const metas = ids ? CREATION_TYPES_META.filter((m) => ids.includes(m.id)) : CREATION_TYPES_META;
  return metas.map((m) => resolveType(m, t));
}
