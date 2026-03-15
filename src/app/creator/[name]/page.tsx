import type { Metadata } from "next";
import { redirect } from "next/navigation";

/**
 * Creator referral page: go7studio.com/creator/escanor
 * 
 * Redirects through the click tracker → Play Store with UTM attribution.
 * Clean URL for creators to share.
 */

// Known creators for metadata
const CREATORS: Record<string, { displayName: string; game: string }> = {
  escanor: { displayName: "Escanor Gaming", game: "Empire Tycoon" },
  ganesh: { displayName: "Gaming Zone", game: "Empire Tycoon" },
};

type Props = {
  params: { name: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const creator = CREATORS[params.name.toLowerCase()];
  const displayName = creator?.displayName || params.name;
  const game = creator?.game || "Empire Tycoon";

  return {
    title: `${displayName} x ${game} - Download Free`,
    description: `Download ${game} using ${displayName}'s link! Build your business empire — free on Google Play.`,
    openGraph: {
      title: `${displayName} x ${game}`,
      description: `Download ${game} free on Google Play!`,
      type: "website",
    },
  };
}

export default function CreatorPage({ params }: Props) {
  const name = params.name.toLowerCase();
  redirect(`/api/track-click?creator=${encodeURIComponent(name)}`);
}
