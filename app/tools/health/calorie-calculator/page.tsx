import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/calorie-calculator").then((m) => m.CalorieCalculatorTool),
  { ssr: false }
);
const p = toolProps("calorie-calculator");

export const metadata = toolMetadata("calorie-calculator", "Calorie Calculator - Daily Calorie Needs");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
