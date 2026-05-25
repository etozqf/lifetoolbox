import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/color-converter").then((m) => m.ColorConverterTool),
  { ssr: false }
);
const p = toolProps("color-converter");

export const metadata = toolMetadata("color-converter", "Color Converter - HEX, RGB & HSL");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
