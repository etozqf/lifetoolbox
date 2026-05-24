"use client";

import Script from "next/script";
import { useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-FM86YNWM13";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Always loads gtag; sends page views only when `enabled` (cookie consent accepted). */
export function GoogleAnalytics({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled || !GA_ID) return;

    const send = () => {
      if (typeof window.gtag !== "function") return false;
      window.gtag("consent", "update", { analytics_storage: "granted" });
      window.gtag("event", "page_view", {
        page_location: window.location.href,
        page_path: window.location.pathname,
        page_title: document.title,
      });
      return true;
    };

    if (send()) return;

    // gtag may not be ready immediately after Accept — retry briefly
    const timer = window.setInterval(() => {
      if (send()) window.clearInterval(timer);
    }, 200);
    const timeout = window.setTimeout(() => window.clearInterval(timer), 5000);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(timeout);
    };
  }, [enabled]);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied' });
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
