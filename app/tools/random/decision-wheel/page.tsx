import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/decision-wheel").then((m) => m.DecisionWheelTool),
  { ssr: false }
);
const p = toolProps("decision-wheel");

export const metadata = toolMetadata("decision-wheel", "Decision Wheel - Spin to Choose");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
