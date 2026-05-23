import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/countdown").then((m) => m.CountdownTool),
  { ssr: false }
);
const p = toolProps("countdown");

export const metadata = toolMetadata("countdown", "Countdown Timer - Days Until Your Date");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
