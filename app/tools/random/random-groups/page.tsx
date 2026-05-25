import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/random-groups").then((m) => m.RandomGroupsTool),
  { ssr: false }
);
const p = toolProps("random-groups");

export const metadata = toolMetadata("random-groups", "Random Group Generator - Split Names into Teams");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
