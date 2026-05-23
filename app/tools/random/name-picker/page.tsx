import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/name-picker").then((m) => m.NamePickerTool),
  { ssr: false }
);
const p = toolProps("name-picker");

export const metadata = toolMetadata("name-picker", "Random Name Picker");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
