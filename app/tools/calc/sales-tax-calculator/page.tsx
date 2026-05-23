import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/sales-tax-calculator").then((m) => m.SalesTaxCalculatorTool),
  { ssr: false }
);
const p = toolProps("sales-tax-calculator");

export const metadata = toolMetadata("sales-tax-calculator", "Sales Tax Calculator - Free Online Tool");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
