import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/oven-temperature").then((m) => m.OvenTemperatureTool),
  { ssr: false }
);
const p = toolProps("oven-temperature");

export const metadata = toolMetadata("oven-temperature", "Oven Temperature Converter - Celsius, Fahrenheit, Gas Mark");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
