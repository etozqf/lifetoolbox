import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/jpg-to-png").then((m) => m.JpgToPngTool),
  { ssr: false }
);
const p = toolProps("jpg-to-png");

export const metadata = toolMetadata("jpg-to-png", "JPG to PNG Converter - Free Online");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
