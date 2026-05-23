import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/ideal-weight").then((m) => m.IdealWeightTool),
  { ssr: false }
);
const p = toolProps("ideal-weight");

export const metadata = toolMetadata("ideal-weight", "Ideal Weight Calculator - Healthy Weight Range");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
