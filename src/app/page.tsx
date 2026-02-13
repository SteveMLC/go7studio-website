import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedGames } from "@/components/home/FeaturedGames";
import { AboutSection } from "@/components/home/AboutSection";
import { StatsSection } from "@/components/home/StatsSection";

export const metadata: Metadata = {
  title: "Go7Studio | Game Development Studio & Consulting",
  description:
    "Go7Studio builds fun-first mobile and Roblox games with satisfying progression and juicy polish. Expert game development consulting for indie studios—Flutter, Roblox, monetization strategy, and MVP prototyping.",
  alternates: { canonical: "/" },
  keywords: ["game development", "mobile games", "Roblox games", "Flutter development", "game consulting", "indie game studio", "monetization strategy"],
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedGames />
      <AboutSection />
      <StatsSection />
    </>
  );
}
