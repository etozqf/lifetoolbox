import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/bmi-calculator").then((m) => m.BmiCalculatorTool),
  { ssr: false }
);
const p = toolProps("bmi-calculator");

export const metadata = toolMetadata("bmi-calculator", "BMI Calculator - Body Mass Index Calculator");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
