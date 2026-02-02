import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedGames } from "@/components/home/FeaturedGames";
import { AboutSection } from "@/components/home/AboutSection";
import { StatsSection } from "@/components/home/StatsSection";

export const metadata: Metadata = {
  title: "Go7Studio",
  description:
    "Go7Studio crafts fun-first mobile and Roblox games with satisfying progression, juicy polish, and replayable worlds.",
  alternates: { canonical: "/" },
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
