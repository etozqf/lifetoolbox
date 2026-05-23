import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () =>
    import("@/components/tools/unit-converter").then((m) => {
      function Page() {
        return <m.UnitConverterTool kind="volume" />;
      }
      return Page;
    }),
  { ssr: false }
);
const p = toolProps("volume");

export const metadata = toolMetadata("volume", "Volume Converter - Liters, Gallons, Cups");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
