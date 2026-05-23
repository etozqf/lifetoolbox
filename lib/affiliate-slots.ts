import type { ToolCluster } from "@/lib/tool-registry";

export type AffiliateItem = {
  title: string;
  description: string;
  href: string;
  cta: string;
};

/** Placeholder Amazon search links — replace `tag=` with your Associates ID when approved. */
export const affiliateByCluster: Partial<Record<ToolCluster, AffiliateItem[]>> = {
  health: [
    {
      title: "Digital bathroom scale",
      description: "Track weight alongside BMI calculations at home.",
      href: "https://www.amazon.com/s?k=digital+bathroom+scale",
      cta: "View on Amazon",
    },
    {
      title: "Fitness tracker",
      description: "Monitor activity and calories with a wearable.",
      href: "https://www.amazon.com/s?k=fitness+tracker",
      cta: "View on Amazon",
    },
  ],
  kitchen: [
    {
      title: "Kitchen food scale",
      description: "Weigh ingredients in grams for accurate baking.",
      href: "https://www.amazon.com/s?k=kitchen+food+scale+grams",
      cta: "View on Amazon",
    },
    {
      title: "Measuring cup set",
      description: "Standard cups and spoons for recipe scaling.",
      href: "https://www.amazon.com/s?k=measuring+cup+set",
      cta: "View on Amazon",
    },
  ],
  finance: [
    {
      title: "Personal finance books",
      description: "Learn budgeting, mortgages, and investing basics.",
      href: "https://www.amazon.com/s?k=personal+finance+book",
      cta: "View on Amazon",
    },
  ],
};

export function getAffiliateItems(cluster: ToolCluster): AffiliateItem[] {
  return affiliateByCluster[cluster] ?? [];
}
