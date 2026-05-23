import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/character-counter").then((m) => m.CharacterCounterTool),
  { ssr: false }
);
const p = toolProps("character-counter");

export const metadata = toolMetadata("character-counter", "Character Counter - Twitter & Instagram");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
