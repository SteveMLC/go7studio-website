"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

function track(event: string, params?: EventParams) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", event, params);
}

export function trackCTAClick(label: string, location: string) {
  track("cta_click", { label, location });
}

export function trackBlogView(slug: string, pillar: string) {
  track("blog_view", { slug, pillar });
}

export function trackBlogScroll(slug: string, depth: number) {
  track("blog_scroll", { slug, depth });
}

export function trackPlayStoreClick(game: string, location: string) {
  track("play_store_click", { game, location });
}

export function trackContactFunnel(step: "view" | "submit" | "success") {
  track("contact_funnel", { step });
}

export function trackDeepLink(target: string, source?: string) {
  track("deep_link", { target, source });
}
