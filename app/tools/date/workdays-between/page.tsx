import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/workdays-between").then((m) => m.WorkdaysBetweenTool),
  { ssr: false }
);
const p = toolProps("workdays-between");

export const metadata = toolMetadata("workdays-between", "Workdays Calculator - Business Days Between Dates");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
