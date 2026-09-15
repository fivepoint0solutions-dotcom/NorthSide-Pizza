import { Sparkles, Trophy, Zap } from "lucide-react";
import type { Package } from "@/components/site/PackageCard";

export const PACKAGES: Package[] = [
  {
    tier: "1. The Snapshot Detail",
    name: "Snapshot Detail",
    price: "$169",
    icon: Sparkles,
    description: "A fast, thorough refresh — inside and out.",
    features: ["Hand wash & foam bath", "Interior vacuum & wipe-down", "Tire shine & window clean"],
  },
  {
    tier: "2. The Slapshot Finish",
    name: "Slapshot Finish",
    price: "$349",
    icon: Zap,
    description: "Our most-booked package — deep clean with a lasting shine.",
    features: [
      "Everything in Snapshot Detail",
      "Clay bar decontamination",
      "One-step paint gloss enhancement",
      "Leather & upholstery conditioning",
    ],
    featured: true,
  },
  {
    tier: "3. The Hat Trick Complete",
    name: "Hat Trick Complete",
    price: "$599",
    icon: Trophy,
    description: "The full showroom transformation, top to bottom.",
    features: [
      "Everything in Slapshot Finish",
      "Multi-stage paint correction",
      "Ceramic coating application",
      "Engine bay detail",
    ],
  },
];
