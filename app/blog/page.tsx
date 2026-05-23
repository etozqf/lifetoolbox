import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog",
  description: "Guides and tutorials for JSON, regex, JWT, and developer workflows.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  return (
    <div className="mx-auto max-w-content px-4 py-12">
      <h1 className="text-3xl font-bold">Blog</h1>
      <p className="mt-2 text-[var(--muted)]">
        Practical guides for developers — with free tools to try inline.
      </p>
      <ul className="mt-10 space-y-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group">
              <h2 className="text-xl font-semibold group-hover:text-brand">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-[var(--muted)]">{post.description}</p>
              <time className="mt-1 block text-xs text-[var(--muted)]">
                {post.date}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
