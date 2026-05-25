import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () =>
    import("@/components/tools/budget-calculator").then(
      (m) => m.BudgetCalculatorTool
    ),
  { ssr: false }
);
const p = toolProps("budget-calculator");

export const metadata = toolMetadata(
  "budget-calculator",
  "Budget Calculator - Income & Expenses"
);

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
