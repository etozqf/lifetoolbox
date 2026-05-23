import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/mortgage-calculator").then((m) => m.MortgageCalculatorTool),
  { ssr: false }
);
const p = toolProps("mortgage-calculator");

export const metadata = toolMetadata("mortgage-calculator", "Mortgage Calculator - Monthly Payment Estimator");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
