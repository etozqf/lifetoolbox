import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/pdf-split").then((m) => m.PdfSplitTool),
  { ssr: false }
);
const p = toolProps("split");

export const metadata = toolMetadata("split", "Split PDF Online - Extract Pages Free");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
