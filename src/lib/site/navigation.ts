import type { TranslationKey } from "@/lib/i18n";

export interface NavItem {
  to: string;
  labelKey?: TranslationKey;
  /** Used when a link has no translated label yet. */
  label?: string;
  description?: string;
}

/** Primary header navigation — deliberately short. Depth lives in the footer. */
export const PRIMARY_NAV: NavItem[] = [
  { to: "/how-it-works", labelKey: "nav.product" },
  { to: "/seniors", labelKey: "nav.seniors" },
  { to: "/families", labelKey: "nav.families" },
  { to: "/adventures", labelKey: "nav.adventures" },
  { to: "/languages", labelKey: "nav.languages" },
  { to: "/pricing", labelKey: "nav.pricing" },
];

export interface FooterColumn {
  headingKey: TranslationKey;
  links: { to: string; label: string }[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    headingKey: "footer.product",
    links: [
      { to: "/how-it-works", label: "How it works" },
      { to: "/adventures", label: "Adventures" },
      { to: "/memories", label: "Memories & legacy" },
      { to: "/day-in-the-life", label: "A day with SR Sidekick" },
      { to: "/pricing", label: "Plans & pricing" },
      { to: "/get-started", label: "Get started" },
    ],
  },
  {
    headingKey: "footer.seniors",
    links: [
      { to: "/seniors", label: "The senior experience" },
      { to: "/how-it-works#location-safety", label: "Location Safety" },
      { to: "/how-it-works#audio-therapy", label: "Audio Therapy & music" },
      { to: "/seniors#voice", label: "Voice-first" },
      { to: "/adventures", label: "Things to do" },
      { to: "/accessibility", label: "Accessibility" },
      { to: "/support", label: "Help & support" },
    ],
  },
  {
    headingKey: "footer.families",
    links: [
      { to: "/families", label: "The family experience" },
      { to: "/families#dashboard", label: "Caregiver dashboard" },
      { to: "/families#permissions", label: "Permissions" },
      { to: "/scenarios", label: "Real-world situations" },
      { to: "/resources", label: "Caregiver resources" },
    ],
  },
  {
    headingKey: "footer.company",
    links: [
      { to: "/about", label: "About us" },
      { to: "/partners", label: "Partnerships" },
      { to: "/languages", label: "Global & languages" },
      { to: "/resources", label: "Resources" },
      { to: "/support", label: "Contact" },
    ],
  },
  {
    headingKey: "footer.legal",
    links: [
      { to: "/privacy", label: "Privacy" },
      { to: "/safety", label: "Safety philosophy" },
      { to: "/accessibility", label: "Accessibility statement" },
      { to: "/faq", label: "FAQ" },
      { to: "/terms", label: "Terms" },
    ],
  },
];
