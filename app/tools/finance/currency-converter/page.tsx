import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/currency-converter").then((m) => m.CurrencyConverterTool),
  { ssr: false }
);
const p = toolProps("currency-converter");

export const metadata = toolMetadata("currency-converter", "Currency Converter - Live Exchange Rates");

export default function Page() {
  return (
    <ToolPageShell
      {...p}
      privacyNote="Exchange rates are fetched via our server proxy; conversion math runs in your browser."
    >
      <Tool />
    </ToolPageShell>
  );
}
