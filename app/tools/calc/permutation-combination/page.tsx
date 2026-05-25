import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () =>
    import("@/components/tools/permutation-combination").then((m) => m.PermutationCombinationTool),
  { ssr: false }
);
const p = toolProps("permutation-combination");

export const metadata = toolMetadata(
  "permutation-combination",
  "Permutation & Combination Calculator - nPr and nCr"
);

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
