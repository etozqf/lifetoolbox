export function AdBanner({ slot = "placeholder" }: { slot?: string }) {
  return (
    <div
      className="my-6 flex min-h-[90px] items-center justify-center rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface-muted)] text-xs text-[var(--muted)]"
      data-ad-slot={slot}
      aria-hidden
    >
      Ad placement reserved ({slot})
    </div>
  );
}
