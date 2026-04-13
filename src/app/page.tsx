import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedGames } from "@/components/home/FeaturedGames";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { AboutSection } from "@/components/home/AboutSection";
import { StatsSection } from "@/components/home/StatsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { HomepageStructuredData } from "@/components/seo/HomepageStructuredData";

export const metadata: Metadata = {
  title: "Go7Studio | Game Development Studio & Consulting",
  description:
    "Go7Studio builds fun-first mobile and Roblox games with satisfying progression and juicy polish. Expert game development consulting for indie studios, plus polished digital product work for learning platforms and serious web experiences.",
  alternates: { canonical: "/" },
  keywords: ["game development", "mobile games", "Roblox games", "Flutter development", "game consulting", "indie game studio", "monetization strategy", "digital product design", "learning platform UX"],
};

export default function HomePage() {
  return (
    <>
      <HomepageStructuredData />
      <HeroSection />
      <FeaturedGames />
      <FeaturedProjects />
      <AboutSection />
      <StatsSection />
      <FaqSection />
    </>
  );
}
