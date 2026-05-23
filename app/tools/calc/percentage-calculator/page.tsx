import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/percentage-calculator").then((m) => m.PercentageCalculatorTool),
  { ssr: false }
);
const p = toolProps("percentage-calculator");

export const metadata = toolMetadata("percentage-calculator", "Percentage Calculator - Free Online Tool");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
