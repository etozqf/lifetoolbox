import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/compound-interest").then((m) => m.CompoundInterestTool),
  { ssr: false }
);
const p = toolProps("compound-interest");

export const metadata = toolMetadata("compound-interest", "Compound Interest Calculator - Free Online");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
