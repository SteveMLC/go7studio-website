"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, Wind, Leaf, Mountain, Sparkles, Download, ExternalLink } from "lucide-react";
import Script from "next/script";
import { getVideoGameSchema, createSchemaGraph } from "@/lib/schema";

// Zen garden elements positioned like a real garden
const gardenElements = [
  { src: "/images/games/sortbloom/zen-garden/rock_shrine_stone.png", x: "15%", y: "60%", size: 100, delay: 0 },
  { src: "/images/games/sortbloom/zen-garden/plant_bonsai.png", x: "75%", y: "45%", size: 90, delay: 0.2 },
  { src: "/images/games/sortbloom/zen-garden/plant_bamboo.png", x: "65%", y: "70%", size: 85, delay: 0.4 },
  { src: "/images/games/sortbloom/zen-garden/rock_medium_cluster1.png", x: "25%", y: "75%", size: 70, delay: 0.6 },
  { src: "/images/games/sortbloom/zen-garden/plant_cherry_blossom.png", x: "80%", y: "25%", size: 80, delay: 0.8 },
  { src: "/images/games/sortbloom/zen-garden/water_lily_pad.png", x: "45%", y: "55%", size: 60, delay: 1 },
];

// Gentle floating garden element
function GardenElement({ element, index }: { element: typeof gardenElements[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { 
        opacity: 1, 
        scale: 1,
      } : {}}
      transition={{ duration: 1, delay: element.delay }}
      className="absolute"
      style={{ 
        left: element.x, 
        top: element.y,
        filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.15))"
      }}
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4 + index * 0.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={element.src}
          alt=""
          width={element.size}
          height={element.size}
          className="object-contain"
        />
      </motion.div>
    </motion.div>
  );
}

// Zen Garden Scene
function ZenGardenScene() {
  return (
    <div className="relative w-full h-[400px] sm:h-[500px]">
      {/* Raked sand circles background */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full"
          style={{
            background: "repeating-radial-gradient(circle at center, transparent 0, transparent 20px, rgba(139, 115, 85, 0.1) 20px, rgba(139, 115, 85, 0.1) 21px)"
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-[20%] left-[15%] w-[150px] h-[150px] rounded-full border border-[#C4B59D]/30"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2, delay: 0.8 }}
          className="absolute bottom-[25%] right-[10%] w-[200px] h-[200px] rounded-full border border-[#C4B59D]/20"
        />
      </div>

      {/* Garden elements */}
      {gardenElements.map((element, index) => (
        <GardenElement key={index} element={element} index={index} />
      ))}
    </div>
  );
}

// Feature card with zen minimalism
function ZenFeature({ 
  icon: Icon, 
  title, 
  description, 
  index 
}: { 
  icon: typeof Wind; 
  title: string; 
  description: string; 
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative p-6"
    >
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#7A9E7E]/20 to-[#8B9A46]/10 ring-1 ring-[#7A9E7E]/30 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#7A9E7E]/20">
        <Icon className="h-5 w-5 text-[#5A7A5E]" />
      </div>
      <h3 className="mb-2 text-lg font-medium text-[#3D3D3D]">{title}</h3>
      <p className="text-sm leading-relaxed text-[#6B6B6B]">{description}</p>
    </motion.div>
  );
}

// Gentle wave divider
function WaveDivider() {
  return (
    <div className="w-full overflow-hidden">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 opacity-30">
        <path 
          d="M0,60 C300,120 600,0 900,60 C1050,90 1150,40 1200,60 L1200,120 L0,120 Z" 
          fill="url(#zenGradient)"
        />
        <defs>
          <linearGradient id="zenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7A9E7E" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#C4B59D" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#7A9E7E" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function SortbloomPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <>
      <Script
        id="sortbloom-game-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            createSchemaGraph(
              getVideoGameSchema({
                name: "Sortbloom - Zen Block Puzzle",
                description: "A meditative block-sorting puzzle where your zen garden grows with every solve. No timers, no pressure—just peace.",
                url: "/games/sortbloom",
                image: "/images/games/sortbloom/icon.png",
                applicationCategory: "GameApplication",
                operatingSystem: "Android",
                offers: {
                  price: "0",
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                },
                aggregateRating: {
                  ratingValue: "4.6",
                  ratingCount: "1000",
                },
              })
            )
          ),
        }}
      />

      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F5F2ED] to-[#EDE8E0]">
        {/* Subtle paper texture overlay */}
        <div 
          className="fixed inset-0 pointer-events-none opacity-30 z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10">
          {/* Navigation */}
          <nav className="container-px py-6">
            <Link 
              href="/games" 
              className="inline-flex items-center gap-2 text-sm text-[#7A7A7A] hover:text-[#5A7A5E] transition-colors duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to games
            </Link>
          </nav>

          {/* Hero Section */}
          <section className="container-px py-12 sm:py-16">
            <motion.div 
              ref={heroRef}
              initial={{ opacity: 0 }}
              animate={isHeroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="grid gap-8 lg:grid-cols-2 lg:items-center"
            >
              <div className="order-2 lg:order-1 text-center lg:text-left">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#7A9E7E]/10 px-4 py-2 text-xs font-medium text-[#5A7A5E] ring-1 ring-[#7A9E7E]/20"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Available Now
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-5xl font-light tracking-tight text-[#3D3D3D] sm:text-6xl lg:text-7xl"
                >
                  Sortbloom
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-3 text-xl text-[#7A9E7E] font-light"
                >
                  Zen Block Puzzle
                </motion.p>

                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-6 text-lg leading-relaxed text-[#6B6B6B] max-w-md mx-auto lg:mx-0"
                >
                  Sort blocks. Watch your garden bloom. Find your zen in this 
                  meditative puzzle experience.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start"
                >
                  <a
                    href="https://play.google.com/store/apps/details?id=com.go7studio.stakd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7A9E7E] to-[#6B8E6B] px-6 py-3 text-sm font-medium text-white shadow-md shadow-[#7A9E7E]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#7A9E7E]/30 hover:-translate-y-0.5"
                  >
                    <Download className="h-4 w-4" />
                    Get it on Google Play
                  </a>

                  <a
                    href="https://sortbloom.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-6 py-3 text-sm font-medium text-[#5A5A5A] ring-1 ring-[#D4C4B0] transition-all duration-300 hover:bg-white hover:shadow-md"
                  >
                    Visit Site
                    <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </motion.div>
              </div>

              <div className="order-1 lg:order-2">
                <ZenGardenScene />
              </div>
            </motion.div>
          </section>

          <WaveDivider />

          {/* How It Works */}
          <section className="container-px py-20 bg-gradient-to-b from-transparent to-[#F8F5F0]/50">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mx-auto max-w-2xl text-center mb-16"
            >
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-[#9A9A9A] mb-4">
                How to Play
              </span>
              <h2 className="text-3xl font-light text-[#3D3D3D]">
                Simple to Learn. Deep to Master.
              </h2>
            </motion.div>

            <div className="grid gap-8 sm:grid-cols-3">
              {[
                { emoji: "🧩", title: "Sort Blocks", desc: "Move colored blocks into matching stacks", color: "from-[#A8C5A8]" },
                { emoji: "🌸", title: "Grow Garden", desc: "Complete puzzles to nurture your zen garden", color: "from-[#E8B4B4]" },
                { emoji: "🏔️", title: "Reach Summit", desc: "Progress through 25 ranks to mastery", color: "from-[#C4B59D]" },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="text-center group"
                >
                  <div className={`mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${item.color} to-white/50 shadow-lg shadow-stone-200/50 transition-transform duration-500 group-hover:scale-105`}>
                    <span className="text-3xl">{item.emoji}</span>
                  </div>
                  <h3 className="mb-2 text-lg font-medium text-[#3D3D3D]">{item.title}</h3>
                  <p className="text-sm text-[#7A7A7A]">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <WaveDivider />

          {/* Features Grid */}
          <section className="container-px py-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mx-auto max-w-2xl text-center mb-16"
            >
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-[#9A9A9A] mb-4">
                Features
              </span>
              <h2 className="text-3xl font-light text-[#3D3D3D]">Find Your Zen</h2>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <ZenFeature icon={Wind} title="No Timers" description="Play at your own peaceful pace. No pressure, no rush." index={0} />
              <ZenFeature icon={Leaf} title="Living Garden" description="Watch your zen garden flourish with every puzzle solved." index={1} />
              <ZenFeature icon={Mountain} title="25 Ranks" description="From Seedling to Summit — a journey of mastery." index={2} />
              <ZenFeature icon={Sparkles} title="48 Achievements" description="Rewards for dedication, speed, and skill." index={3} />
            </div>
          </section>

          {/* CTA Section */}
          <section className="container-px py-20">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#7A9E7E]/10 via-[#C4B59D]/10 to-[#7A9E7E]/5 border border-[#C4B59D]/30 p-10 sm:p-16 text-center"
            >
              {/* Decorative circles */}
              <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-[#7A9E7E]/5 -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-[#C4B59D]/5 translate-x-1/3 translate-y-1/3" />
              
              <div className="relative">
                <h2 className="text-3xl font-light text-[#3D3D3D] mb-3">
                  Ready to Find Your Zen?
                </h2>
                <p className="mb-8 text-[#6B6B6B] max-w-md mx-auto">
                  Download Sortbloom today and begin your journey.
                </p>
                
                <a
                  href="https://play.google.com/store/apps/details?id=com.go7studio.stakd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7A9E7E] to-[#6B8E6B] px-8 py-4 text-base font-medium text-white shadow-lg shadow-[#7A9E7E]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#7A9E7E]/30 hover:-translate-y-0.5"
                >
                  <Download className="h-5 w-5" />
                  Download Free on Google Play
                </a>
              </div>
            </motion.div>
          </section>

          {/* Footer */}
          <footer className="container-px py-10 border-t border-[#D4C4B0]/30">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-sm text-[#9A9A9A]">
                © 2025 Go7Studio. Made with peace. 🍃
              </p>
              <div className="flex gap-6">
                <Link href="/games" className="text-sm text-[#9A9A9A] hover:text-[#5A7A5E] transition-colors">
                  All Games
                </Link>
                <a 
                  href="https://sortbloom.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#9A9A9A] hover:text-[#5A7A5E] transition-colors"
                >
                  Sortbloom.com
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
