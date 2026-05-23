import dynamic from "next/dynamic";
import { ToolPageShell } from "@/components/tool-page-shell";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";

const Tool = dynamic(
  () => import("@/components/tools/qr-code").then((m) => m.QrCodeTool),
  { ssr: false }
);
const p = toolProps("qr-code");

export const metadata = toolMetadata("qr-code", "QR Code Generator - Free Online");

export default function Page() {
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
