import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () =>
    import("@/components/tools/unit-converter").then((m) => {
      function LengthConverterPage() {
        return <m.UnitConverterTool kind="length" />;
      }
      return LengthConverterPage;
    }),
  { ssr: false }
);
const p = toolProps("length");

export const metadata = toolMetadata("length", "Length Converter - cm to inches, feet, miles");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
