import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/dice-roller").then((m) => m.DiceRollerTool),
  { ssr: false }
);
const p = toolProps("dice-roller");

export const metadata = toolMetadata("dice-roller", "Dice Roller - Roll Dice Online");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
