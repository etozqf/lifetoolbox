import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/roman-numeral").then((m) => m.RomanNumeralTool),
  { ssr: false }
);
const p = toolProps("roman-numeral");

export const metadata = toolMetadata("roman-numeral", "Roman Numeral Converter - Arabic ↔ Roman");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
