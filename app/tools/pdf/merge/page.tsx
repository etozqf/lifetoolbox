import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/pdf-merge").then((m) => m.PdfMergeTool),
  { ssr: false }
);
const p = toolProps("merge");

export const metadata = toolMetadata("merge", "Merge PDF Online - Combine PDF Files Free");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
