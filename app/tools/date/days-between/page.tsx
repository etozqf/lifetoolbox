import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/days-between").then((m) => m.DaysBetweenTool),
  { ssr: false }
);
const p = toolProps("days-between");

export const metadata = toolMetadata("days-between", "Days Between Dates Calculator");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
