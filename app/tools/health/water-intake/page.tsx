import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/water-intake").then((m) => m.WaterIntakeTool),
  { ssr: false }
);
const p = toolProps("water-intake");

export const metadata = toolMetadata("water-intake", "Water Intake Calculator - How Much Water to Drink");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
