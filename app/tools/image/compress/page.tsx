import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/image-compress").then((m) => m.ImageCompressTool),
  { ssr: false }
);
const p = toolProps("compress");

export const metadata = toolMetadata("compress", "Image Compressor - Reduce JPG File Size Online");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
