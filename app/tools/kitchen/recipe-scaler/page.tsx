import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/recipe-scaler").then((m) => m.RecipeScalerTool),
  { ssr: false }
);
const p = toolProps("recipe-scaler");

export const metadata = toolMetadata("recipe-scaler", "Recipe Scaler - Scale Ingredients by Servings");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
