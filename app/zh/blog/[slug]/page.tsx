import { notFound } from "next/navigation";
import { BlogPostView } from "@/components/blog-post";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/seo";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug, "zh");
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `${siteConfig.siteUrl}/zh/blog/${params.slug}`,
      languages: {
        en: `${siteConfig.siteUrl}/blog/${params.slug}`,
        zh: `${siteConfig.siteUrl}/zh/blog/${params.slug}`,
      },
    },
  };
}

export default function ZhBlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug, "zh");
  if (!post) notFound();
  return <BlogPostView post={post} />;
}
