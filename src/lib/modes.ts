import { Lightbulb, ListChecks, ShieldQuestion, Users, type LucideIcon } from "lucide-react";
import type { CreationType, Mode, QuickAction } from "./ai";

export interface ModeConfig {
  id: Mode;
  label: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  gradientClass: string;
  href: string;
}

export const MODES: ModeConfig[] = [
  {
    id: "inspire",
    label: "Inspire Me",
    tagline: "Get ideas, not a finished lesson",
    description:
      "Multiple approaches and angles to spark your own thinking — you pick and customize.",
    icon: Lightbulb,
    gradientClass: "gradient-inspire",
    href: "/inspire",
  },
  {
    id: "build",
    label: "Build With Me",
    tagline: "Develop it together, step by step",
    description:
      "Answer a few quick questions and shape a lesson collaboratively — you're in every decision.",
    icon: Users,
    gradientClass: "gradient-build",
    href: "/build",
  },
  {
    id: "busywork",
    label: "Do The Busywork",
    tagline: "Skip straight to the finished material",
    description: "Worksheets, quizzes, rubrics, parent messages — the practical stuff, done fast.",
    icon: ListChecks,
    gradientClass: "gradient-busywork",
    href: "/busywork",
  },
  {
    id: "challenge",
    label: "Challenge Me",
    tagline: "Pressure-test your idea",
    description:
      "A second opinion that pokes at weak spots and offers alternatives — never a verdict.",
    icon: ShieldQuestion,
    gradientClass: "gradient-challenge",
    href: "/challenge",
  },
];

export function modeConfig(id: Mode): ModeConfig {
  return MODES.find((m) => m.id === id) ?? MODES[0]!;
}

const DEFAULT_TYPE_FOR_MODE: Record<Mode, CreationType> = {
  inspire: "brainstorm",
  build: "lesson",
  busywork: "worksheet",
  challenge: "other",
};

export function defaultTypeForMode(mode: Mode): CreationType {
  return DEFAULT_TYPE_FOR_MODE[mode];
}

export const QUICK_ACTIONS: { id: QuickAction; label: string }[] = [
  { id: "three-approaches", label: "Give me 3 approaches" },
  { id: "more-creative", label: "Make this more creative" },
  { id: "simpler", label: "Make this simpler" },
  { id: "more-challenging", label: "Make this more challenging" },
  { id: "different-approach", label: "Try a completely different approach" },
  { id: "improve", label: "Help me improve this" },
  { id: "boring-parts", label: "Take care of the boring parts" },
];
