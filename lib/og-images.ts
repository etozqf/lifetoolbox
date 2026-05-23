/**
 * Cluster-level Open Graph image paths (1200×630 PNG).
 */
import type { ToolCluster } from "@/lib/tool-registry";

export const clusterOgImages: Record<ToolCluster, string> = {
  calc: "/og-images/calc.png",
  health: "/og-images/health.png",
  date: "/og-images/date.png",
  convert: "/og-images/convert.png",
  random: "/og-images/random.png",
  social: "/og-images/social.png",
  kitchen: "/og-images/kitchen.png",
  image: "/og-images/image.png",
  pdf: "/og-images/pdf.png",
  finance: "/og-images/finance.png",
};

export function getOgImageForCluster(cluster?: ToolCluster): string {
  if (cluster && clusterOgImages[cluster]) return clusterOgImages[cluster];
  return "/og-images/default.png";
}
