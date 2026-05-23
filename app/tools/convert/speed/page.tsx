import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () =>
    import("@/components/tools/unit-converter").then((m) => {
      function Page() {
        return <m.UnitConverterTool kind="speed" />;
      }
      return Page;
    }),
  { ssr: false }
);
const p = toolProps("speed");

export const metadata = toolMetadata("speed", "Speed Converter - mph, km/h, knots");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
