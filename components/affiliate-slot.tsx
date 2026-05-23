import Link from "next/link";
import { getAffiliateItems } from "@/lib/affiliate-slots";
import type { ToolCluster } from "@/lib/tool-registry";

export function AffiliateSlot({ cluster }: { cluster: ToolCluster }) {
  const items = getAffiliateItems(cluster);
  if (items.length === 0) return null;

  return (
    <aside className="mt-8 space-y-3" aria-label="Recommended products">
      <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
        Recommended <span id="ad">#ad</span>
      </p>
      {items.map((item) => (
        <div
          key={item.href}
          className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-4"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">{item.description}</p>
            </div>
            <Link
              href={item.href}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="btn-secondary shrink-0 text-sm"
            >
              {item.cta}
            </Link>
          </div>
        </div>
      ))}
      <p className="text-xs text-[var(--muted)]">
        Affiliate link — we may earn a commission at no extra cost to you.{" "}
        <Link href="/affiliate-disclosure" className="text-brand underline">
          Disclosure
        </Link>
      </p>
    </aside>
  );
}
