/** Plans, partnerships and the commercial layer. */

export interface Plan {
  slug: string;
  name: string;
  audience: string;
  price: string;
  cadence: string;
  summary: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

export const PLANS: Plan[] = [
  {
    slug: "senior",
    name: "Senior",
    audience: "One person, living independently",
    price: "$19",
    cadence: "per month",
    summary: "The full companion for one person, with one family member connected.",
    features: [
      "Unlimited conversation and all seven adventures",
      "All four launch languages, switchable any time",
      "Memory system with 50 GB of photos and recordings",
      "One connected family member",
      "Voice and video calling",
      "Accessibility suite and phone support",
    ],
    cta: "Start free for 30 days",
  },
  {
    slug: "family",
    name: "Family",
    audience: "One senior, the whole family around them",
    price: "$29",
    cadence: "per month",
    summary: "Everything in Senior, opened up to everyone who wants to stay close.",
    features: [
      "Everything in the Senior plan",
      "Up to eight connected family members",
      "Shared family calendar and photo stream",
      "Family-created games and story prompts",
      "Legacy collections and annual keepsake export",
      "Per-person permissions, set by the senior",
    ],
    cta: "Start free for 30 days",
    featured: true,
  },
  {
    slug: "household",
    name: "Household",
    audience: "Two seniors in one home",
    price: "$44",
    cadence: "per month",
    summary: "Two separate companions, two separate profiles, one household.",
    features: [
      "Two independent Sidekicks with separate memories",
      "Everything in the Family plan for each person",
      "Shared household calendar",
      "Separate privacy settings — neither profile sees the other's",
      "Single bill",
    ],
    cta: "Start free for 30 days",
  },
  {
    slug: "professional",
    name: "Professional care",
    audience: "Care organisations and home-care agencies",
    price: "From $12",
    cadence: "per resident, per month",
    summary: "Deployed across a service, with residents still holding the permissions.",
    features: [
      "Volume pricing from ten residents",
      "Staff console with resident-granted access only",
      "Activity programming and group adventures",
      "Onboarding, training and a named account manager",
      "Consolidated billing and reporting that respects privacy limits",
    ],
    cta: "Talk to us",
  },
  {
    slug: "enterprise",
    name: "Institutional",
    audience: "Health systems, insurers, national programmes",
    price: "Custom",
    cadence: "",
    summary: "Large-scale deployment with the integration and assurance work that requires.",
    features: [
      "Custom languages and regional localisation",
      "SSO, data residency and procurement documentation",
      "Integration with existing care platforms",
      "Outcome measurement designed with your research team",
      "Dedicated implementation and support",
    ],
    cta: "Talk to us",
  },
];

export const PRICING_NOTES: string[] = [
  "Thirty days free on every self-serve plan. No card required to start.",
  "Cancel in one step, by voice or in the family dashboard.",
  "Prices shown in USD. Local pricing and currency shown automatically in supported regions.",
  "The senior's memories and recordings are exportable at any time, including after cancellation.",
];

export interface PartnerTrack {
  title: string;
  body: string;
  bullets: string[];
  icon: string;
}

export const PARTNER_TRACKS: PartnerTrack[] = [
  {
    title: "Senior living communities",
    body: "In-room companionship for the hours between scheduled activities, with residents — not staff — holding the permissions.",
    bullets: [
      "Deployment across independent living, assisted living and memory care",
      "Activity programming that reaches residents who don't come to the lounge",
      "Family connection that doesn't route through the front desk",
      "Staff console limited to what each resident has granted",
    ],
    icon: "building-2",
  },
  {
    title: "Care organisations",
    body: "Home care agencies and care management services extending their reach between visits.",
    bullets: [
      "Companionship between scheduled visits",
      "Reminder support agreed with the client and family",
      "Caregiver handover notes, within the client's permission settings",
      "Training and onboarding for care teams",
    ],
    icon: "hand-heart",
  },
  {
    title: "Healthcare-adjacent organisations",
    body: "Social prescribing, loneliness programmes and post-discharge support, with clear boundaries about what this is.",
    bullets: [
      "Explicitly non-clinical, and documented as such",
      "Loneliness and social isolation programmes",
      "Post-discharge companionship for people living alone",
      "Outcome measurement designed with your research team",
    ],
    icon: "activity",
  },
  {
    title: "Community organisations",
    body: "Libraries, faith groups, veterans' associations and neighbourhood networks bringing this to their members.",
    bullets: [
      "Group licensing at community rates",
      "Local content: local history, local music, local events",
      "Volunteer-supported onboarding for members who need a hand",
      "Multilingual deployment for diaspora communities",
    ],
    icon: "users",
  },
  {
    title: "Technology partners",
    body: "Device makers, telecoms and platforms who want a companion layer built for this audience.",
    bullets: [
      "Preinstallation on tablets and smart displays",
      "Telecom bundles for senior-focused plans",
      "Accessibility hardware integration",
      "API access under a partnership agreement",
    ],
    icon: "plug",
  },
];
