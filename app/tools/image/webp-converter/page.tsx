import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/webp-converter").then((m) => m.WebpConverterTool),
  { ssr: false }
);
const p = toolProps("webp-converter");

export const metadata = toolMetadata(
  "webp-converter",
  "WebP Converter - Convert Images Online"
);

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
