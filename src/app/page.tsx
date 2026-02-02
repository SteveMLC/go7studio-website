import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedGames } from "@/components/home/FeaturedGames";
import { AboutSection } from "@/components/home/AboutSection";
import { StatsSection } from "@/components/home/StatsSection";

export const metadata: Metadata = {
  title: "Home",
  description: "[Home page description goes here]",
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
