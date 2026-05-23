import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () =>
    import("@/components/tools/unit-converter").then((m) => {
      function WeightConverterPage() {
        return <m.UnitConverterTool kind="weight" />;
      }
      return WeightConverterPage;
    }),
  { ssr: false }
);
const p = toolProps("weight");

export const metadata = toolMetadata("weight", "Weight Converter - kg to lbs");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
