import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () =>
    import("@/components/tools/unit-converter").then((m) => {
      function Page() {
        return <m.UnitConverterTool kind="area" />;
      }
      return Page;
    }),
  { ssr: false }
);
const p = toolProps("area");

export const metadata = toolMetadata("area", "Area Converter - Square Meters, Acres, Feet");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
