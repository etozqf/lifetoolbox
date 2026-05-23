import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/discount-calculator").then((m) => m.DiscountCalculatorTool),
  { ssr: false }
);
const p = toolProps("discount-calculator");

export const metadata = toolMetadata("discount-calculator", "Discount Calculator - Sale Price Calculator");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
