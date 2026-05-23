import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/image-resize").then((m) => m.ImageResizeTool),
  { ssr: false }
);
const p = toolProps("resize");

export const metadata = toolMetadata("resize", "Image Resizer - Resize Photos Online Free");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
