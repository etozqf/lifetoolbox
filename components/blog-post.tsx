import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { JsonLd } from "./json-ld";
import { AdBanner } from "./ad-banner";
import { getToolBySlug } from "@/lib/tool-registry";
import { siteConfig } from "@/lib/seo";
import type { BlogPost } from "@/lib/blog";

export function BlogPostView({ post }: { post: BlogPost }) {
  const tool = post.relatedTool ? getToolBySlug(post.relatedTool) : null;
  const faq = extractFaq(post.content);

  return (
    <article className="mx-auto max-w-prose px-4 py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.date,
          author: { "@type": "Organization", name: siteConfig.siteName },
        }}
      />
      {faq.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }}
        />
      )}
      <header>
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">{post.date}</p>
      </header>
      <AdBanner slot="article-top" />
      <div className="prose prose-slate mt-8 max-w-none dark:prose-invert prose-pre:bg-[var(--surface-muted)]">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
      {tool && (
        <div className="mt-10 rounded-xl border border-brand bg-brand-light p-6 dark:bg-brand/10">
          <h2 className="font-semibold">Try it yourself</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Use our free {tool.name} — no signup required.
          </p>
          <Link href={tool.path} className="btn-primary mt-4 inline-flex">
            Open {tool.name} →
          </Link>
        </div>
      )}
      <AdBanner slot="article-bottom" />
    </article>
  );
}

function extractFaq(content: string): { q: string; a: string }[] {
  const faqSection = content.split("## Frequently Asked Questions")[1];
  if (!faqSection) return [];
  const items: { q: string; a: string }[] = [];
  const blocks = faqSection.split("### ").slice(1);
  for (const block of blocks) {
    const [qLine, ...rest] = block.split("\n");
    const q = qLine?.trim();
    const a = rest.join("\n").trim();
    if (q && a) items.push({ q, a });
  }
  return items;
}
