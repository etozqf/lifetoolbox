import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/age-calculator").then((m) => m.AgeCalculatorTool),
  { ssr: false }
);
const p = toolProps("age-calculator");

export const metadata = toolMetadata("age-calculator", "Age Calculator - How Old Am I?");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
