import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () =>
    import("@/components/tools/body-fat-calculator").then(
      (m) => m.BodyFatCalculatorTool
    ),
  { ssr: false }
);
const p = toolProps("body-fat-calculator");

export const metadata = toolMetadata(
  "body-fat-calculator",
  "Body Fat Calculator - US Navy Method"
);

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
