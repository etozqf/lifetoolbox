import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/text-scroller").then((m) => m.TextScrollerTool),
  { ssr: false }
);
const p = toolProps("text-scroller");

export const metadata = toolMetadata(
  "text-scroller",
  "Text Scroller - Free Online Marquee & LED Display"
);

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
