import { notFound } from "next/navigation";
import { ToolPageShell } from "@/components/tool-page-shell";
import { getToolSlugFromSegments, loadToolComponent } from "@/lib/tool-loader";
import { toolMetadata, toolProps } from "@/lib/tool-page-meta";
import { CURRENT_PHASE, getToolBySlug, getToolsByPhase } from "@/lib/tool-registry";

type Props = { params: { segments?: string[] } };

export function generateStaticParams() {
  return getToolsByPhase(CURRENT_PHASE).map((tool) => ({
    segments: tool.path.replace("/tools/", "").split("/"),
  }));
}

export function generateMetadata({ params }: Props) {
  const slug = getToolSlugFromSegments(params.segments);
  if (!slug) return {};
  const tool = getToolBySlug(slug);
  if (!tool || tool.phase > CURRENT_PHASE) return {};
  return toolMetadata(slug, undefined, "zh");
}

export default function ZhToolPage({ params }: Props) {
  const slug = getToolSlugFromSegments(params.segments);
  if (!slug) notFound();
  const tool = getToolBySlug(slug);
  if (!tool || tool.phase > CURRENT_PHASE) notFound();
  const Tool = loadToolComponent(slug);
  if (!Tool) notFound();
  const p = toolProps(slug, "zh");
  return (
    <ToolPageShell {...p}>
      <Tool />
    </ToolPageShell>
  );
}
