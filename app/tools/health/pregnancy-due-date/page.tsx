import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/pregnancy-due-date").then((m) => m.PregnancyDueDateTool),
  { ssr: false }
);
const p = toolProps("pregnancy-due-date");

export const metadata = toolMetadata("pregnancy-due-date", "Pregnancy Due Date Calculator");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
