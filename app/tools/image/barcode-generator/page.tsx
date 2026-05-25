import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () =>
    import("@/components/tools/barcode-generator").then(
      (m) => m.BarcodeGeneratorTool
    ),
  { ssr: false }
);
const p = toolProps("barcode-generator");

export const metadata = toolMetadata(
  "barcode-generator",
  "Barcode Generator - CODE128, EAN-13, UPC"
);

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
