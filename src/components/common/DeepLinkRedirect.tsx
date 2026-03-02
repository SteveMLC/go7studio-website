"use client";

import { useEffect } from "react";
import { trackDeepLink } from "@/lib/analytics";

export function DeepLinkRedirect({ to, source }: { to: string; source: string }) {
  useEffect(() => {
    trackDeepLink(to, source);
    const t = setTimeout(() => {
      window.location.href = to;
    }, 150);
    return () => clearTimeout(t);
  }, [to, source]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center text-center">
      <p className="text-white/70">Redirecting… <a href={to} className="text-brand-teal underline">Click here</a></p>
    </div>
  );
}
