import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/tip-calculator").then((m) => m.TipCalculatorTool),
  { ssr: false }
);
const p = toolProps("tip-calculator");

export const metadata = toolMetadata("tip-calculator", "Tip Calculator - Free Online Gratuity Calculator");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
