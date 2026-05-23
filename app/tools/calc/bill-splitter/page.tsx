import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/bill-splitter").then((m) => m.BillSplitterTool),
  { ssr: false }
);
const p = toolProps("bill-splitter");

export const metadata = toolMetadata("bill-splitter", "Bill Splitter - Split Restaurant Bills Fairly");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
