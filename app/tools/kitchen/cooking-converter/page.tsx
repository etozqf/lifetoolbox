import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/cooking-converter").then((m) => m.CookingConverterTool),
  { ssr: false }
);
const p = toolProps("cooking-converter");

export const metadata = toolMetadata("cooking-converter", "Cooking Converter - Cups to Grams");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
