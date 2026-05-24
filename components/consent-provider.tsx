"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { GoogleAnalytics } from "./google-analytics";

export type ConsentStatus = "accepted" | "rejected" | null;

const STORAGE_KEY = "cookie-consent";

const ConsentContext = createContext<{
  consent: ConsentStatus;
  setConsent: (value: "accepted" | "rejected") => void;
} | null>(null);

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<ConsentStatus>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted" || stored === "rejected") {
      setConsentState(stored);
    }
    setReady(true);
  }, []);

  const setConsent = useCallback((value: "accepted" | "rejected") => {
    localStorage.setItem(STORAGE_KEY, value);
    setConsentState(value);
  }, []);

  return (
    <ConsentContext.Provider value={{ consent, setConsent }}>
      {children}
      {ready && consent === null && <CookieBanner onChoice={setConsent} />}
      <GoogleAnalytics enabled={consent === "accepted"} />
    </ConsentContext.Provider>
  );
}

function CookieBanner({
  onChoice,
}: {
  onChoice: (value: "accepted" | "rejected") => void;
}) {
  return (
    <aside
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-[var(--border)] bg-[var(--surface)] p-4 shadow-lg md:p-6"
    >
      <div className="mx-auto flex max-w-content flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-[var(--muted)]">
          We use cookies for analytics (Google Analytics) to understand how the
          site is used. Tool data stays in your browser. See our{" "}
          <Link href="/privacy" className="text-brand underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => onChoice("rejected")}
          >
            Reject
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={() => onChoice("accepted")}
          >
            Accept
          </button>
        </div>
      </div>
    </aside>
  );
}
