import type { Metadata } from "next";
import { DeepLinkRedirect } from "@/components/common/DeepLinkRedirect";

const PLAY_STORE_BASE = "https://play.google.com/store/apps/details?id=com.go7studio.empire_tycoon";

export const metadata: Metadata = {
  title: "Empire Tycoon - Download on Google Play",
  description: "Build your business empire! Idle tycoon with real estate & smart investing. Download free on Google Play.",
  alternates: { canonical: "/play/empire" },
};

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

function buildPlayStoreUrl(searchParams: PageProps["searchParams"]): string {
  const referrerParts: string[] = [];
  const directReferrer = searchParams.referrer;
  if (typeof directReferrer === "string" && directReferrer) {
    return `${PLAY_STORE_BASE}&referrer=${encodeURIComponent(directReferrer)}`;
  }

  const refCode = searchParams.ref;
  if (typeof refCode === "string" && refCode) {
    referrerParts.push(`referral_code=${refCode}`);
  }

  const utmParams = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  for (const param of utmParams) {
    const value = searchParams[param];
    if (typeof value === "string" && value) {
      referrerParts.push(`${param}=${value}`);
    }
  }

  if (referrerParts.length > 0 && !referrerParts.some((p) => p.startsWith("utm_source="))) {
    referrerParts.unshift("utm_source=go7studio");
  }

  if (referrerParts.length > 0) {
    const referrerString = referrerParts.join("&");
    return `${PLAY_STORE_BASE}&referrer=${encodeURIComponent(referrerString)}`;
  }

  return PLAY_STORE_BASE;
}

export default function PlayEmpirePage({ searchParams }: PageProps) {
  return <DeepLinkRedirect to={buildPlayStoreUrl(searchParams)} source="play_empire" />;
}
