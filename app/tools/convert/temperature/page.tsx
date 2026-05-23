import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/unit-converter").then((m) => m.TemperatureConverterTool),
  { ssr: false }
);
const p = toolProps("temperature");

export const metadata = toolMetadata("temperature", "Temperature Converter - Celsius to Fahrenheit");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
