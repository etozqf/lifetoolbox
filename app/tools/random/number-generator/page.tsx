import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/number-generator").then((m) => m.NumberGeneratorTool),
  { ssr: false }
);
const p = toolProps("number-generator");

export const metadata = toolMetadata("number-generator", "Random Number Generator");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
