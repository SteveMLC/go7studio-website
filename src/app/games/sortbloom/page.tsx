"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowLeft, Leaf, Wind, Sparkles, Mountain, Download, ExternalLink } from "lucide-react";
import Script from "next/script";
import { getVideoGameSchema, createSchemaGraph } from "@/lib/schema";

// Zen garden elements for stacked composition
const zenElements = [
  { src: "/images/games/sortbloom/zen-garden/rock_shrine_stone.png", name: "Shrine Stone", layer: 1 },
  { src: "/images/games/sortbloom/zen-garden/plant_bonsai.png", name: "Bonsai", layer: 2 },
  { src: "/images/games/sortbloom/zen-garden/plant_bamboo.png", name: "Bamboo", layer: 3 },
  { src: "/images/games/sortbloom/zen-garden/plant_cherry_blossom.png", name: "Cherry Blossom", layer: 4 },
  { src: "/images/games/sortbloom/zen-garden/water_lily_pad.png", name: "Lily Pad", layer: 5 },
];

// Floating sakura petals animation
function FloatingPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const petals: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createPetal = () => ({
      x: Math.random() * canvas.width,
      y: -20,
      size: Math.random() * 8 + 4,
      speedY: Math.random() * 1 + 0.5,
      speedX: (Math.random() - 0.5) * 0.5,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.4 + 0.3,
    });

    const init = () => {
      resize();
      for (let i = 0; i < 25; i++) {
        const petal = createPetal();
        petal.y = Math.random() * canvas.height;
        petals.push(petal);
      }
    };

    const drawPetal = (p: typeof petals[0]) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      
      // Draw cherry blossom petal shape
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.5, -p.size * 0.5, p.size * 0.5, p.size * 0.5, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.5, p.size * 0.5, -p.size * 0.5, -p.size * 0.5, 0, -p.size);
      ctx.fillStyle = "#FFB7C5";
      ctx.fill();
      
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petals.forEach((p, i) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.3;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height + 20) {
          petals[i] = createPetal();
        }

        drawPetal(p);
      });

      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10"
    />
  );
}

// Stacked zen garden composition
function ZenGardenStack() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="relative mx-auto h-[400px] w-[300px] sm:h-[500px] sm:w-[400px]">
      {/* Background sand texture */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#E8DCC4] to-[#D4C4A8] opacity-30 blur-3xl" />
      
      {/* Zen elements stacked */}
      <AnimatePresence>
        {zenElements.map((element, index) => (
          <motion.div
            key={element.name}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0, 
              scale: hoveredIndex === index ? 1.1 : 1,
              zIndex: hoveredIndex === index ? 10 : element.layer,
            } : {}}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.15,
              type: "spring",
              stiffness: 100,
            }}
            className="absolute left-1/2 cursor-pointer"
            style={{
              bottom: `${index * 60}px`,
              transform: "translateX(-50%)",
              zIndex: hoveredIndex === index ? 10 : element.layer,
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="relative">
              <Image
                src={element.src}
                alt={element.name}
                width={120 + index * 20}
                height={120 + index * 20}
                className="drop-shadow-2xl transition-all duration-300"
                style={{
                  filter: hoveredIndex === index ? "brightness(1.2)" : "brightness(1)",
                }}
              />
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur-sm"
                  >
                    {element.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Feature card with zen styling
function ZenFeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  index 
}: { 
  icon: typeof Leaf; 
  title: string; 
  description: string; 
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 p-6 transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/[0.08]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="relative">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 ring-1 ring-emerald-500/30">
          <Icon className="h-6 w-6 text-emerald-400" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-white/60">{description}</p>
      </div>
    </motion.div>
  );
}

// Rank progression
const ranks = [
  { name: "Seedling", color: "#8B9A46" },
  { name: "Sprout", color: "#7A9E7E" },
  { name: "Gardener", color: "#6B8E6B" },
  { name: "Zen Master", color: "#D4A574" },
  { name: "Summit", color: "#C9B037" },
];

function RankProgression() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500/50 via-teal-500/50 to-amber-500/50" />
      
      <div className="space-y-6">
        {ranks.map((rank, index) => (
          <motion.div
            key={rank.name}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative flex items-center gap-4 pl-12"
          >
            <div 
              className="absolute left-2 h-4 w-4 rounded-full ring-4 ring-ink-950"
              style={{ backgroundColor: rank.color }}
            />
            <div className="flex-1 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
              <span className="text-sm font-medium text-white">{rank.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function SortbloomPage() {
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
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-900 via-[#1a2f2a] to-slate-950">
      <FloatingPetals />

      {/* Background layers */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-20">
        {/* Navigation */}
        <nav className="container-px py-6">
          <Link
            href="/games"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to games
          </Link>
        </nav>

        {/* Hero Section */}
        <section className="container-px py-12 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/30">
                <Sparkles className="h-3.5 w-3.5" />
                Available Now
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Sortbloom
              </h1>

              <p className="mt-4 text-xl text-emerald-100/80">
                Zen Block Puzzle
              </p>

              <p className="mt-6 text-lg leading-relaxed text-white/70">
                Sort blocks. Watch your garden bloom. Find your zen in this 
                meditative puzzle experience where every solve nurtures your 
                personal sanctuary.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://play.google.com/store/apps/details?id=com.go7studio.stakd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:scale-105"
                >
                  <Download className="h-4 w-4" />
                  Get it on Google Play
                </a>

                <a
                  href="https://sortbloom.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition-all hover:bg-white/15"
                >
                  Visit Sortbloom.com
                  <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <ZenGardenStack />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="container-px py-16 border-t border-white/5">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <span className="inline-block rounded-full bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/60 ring-1 ring-white/10 mb-4">
              How to Play
            </span>
            <h2 className="text-2xl font-bold text-white">Simple to Learn. Deep to Master.</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="relative">
              <div className="absolute top-8 left-full w-full h-px bg-gradient-to-r from-emerald-500/30 to-transparent hidden sm:block" />
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10">
                  <span className="text-3xl">🧩</span>
                </div>
                <h3 className="mb-2 font-semibold text-white">Sort Blocks</h3>
                <p className="text-sm text-white/50">Move colored blocks into matching stacks</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute top-8 left-full w-full h-px bg-gradient-to-r from-teal-500/30 to-transparent hidden sm:block" />
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500/20 to-teal-600/10">
                  <span className="text-3xl">🌸</span>
                </div>
                <h3 className="mb-2 font-semibold text-white">Grow Garden</h3>
                <p className="text-sm text-white/50">Complete puzzles to nurture your zen garden</p>
              </div>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10">
                <span className="text-3xl">🏔️</span>
              </div>
              <h3 className="mb-2 font-semibold text-white">Reach Summit</h3>
              <p className="text-sm text-white/50">Progress through 25 ranks to mastery</p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container-px py-16 border-t border-white/5">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/60 ring-1 ring-white/10 mb-4">
                Features
              </span>
              <h2 className="text-2xl font-bold text-white mb-8">Find Your Zen</h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <ZenFeatureCard
                  icon={Wind}
                  title="No Timers, No Pressure"
                  description="Play at your own peaceful pace. No ads interrupting your flow."
                  index={0}
                />
                <ZenFeatureCard
                  icon={Leaf}
                  title="Living Garden"
                  description="Watch your zen garden flourish as you solve puzzles."
                  index={1}
                />
                <ZenFeatureCard
                  icon={Mountain}
                  title="25 Ranks"
                  description="From Seedling to Summit — master 25 levels of progression."
                  index={2}
                />
                <ZenFeatureCard
                  icon={Sparkles}
                  title="48 Achievements"
                  description="Unlock rewards for mastery, speed, streaks, and more."
                  index={3}
                />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <span className="inline-block rounded-full bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/60 ring-1 ring-white/10 mb-4">
                Progression
              </span>
              <h2 className="text-2xl font-bold text-white mb-8">Rise Through the Ranks</h2>
              <RankProgression />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container-px py-24">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900/40 to-teal-900/20 border border-emerald-500/20 p-8 sm:p-12 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
            
            <div className="relative">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Find Your Zen?
              </h2>
              <p className="mb-8 text-white/60 max-w-md mx-auto">
                Download Sortbloom today and begin your journey to puzzle mastery.
              </p>
              
              <a
                href="https://play.google.com/store/apps/details?id=com.go7studio.stakd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:scale-105"
              >
                <Download className="h-5 w-5" />
                Download Free on Google Play
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="container-px py-8 border-t border-white/5">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-white/30">
              © 2025 Go7Studio. Sortbloom is a trademark of Go7Studio LLC.
            </p>
            <div className="flex gap-6">
              <Link href="/games" className="text-sm text-white/30 hover:text-white/60">
                All Games
              </Link>
              <a 
                href="https://sortbloom.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/30 hover:text-white/60"
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
