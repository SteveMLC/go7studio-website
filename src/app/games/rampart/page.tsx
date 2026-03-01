"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, Skull, Shield, Zap, Target } from "lucide-react";
import { WaitlistForm } from "@/components/common/WaitlistForm";

// Wave animation component
function WaveAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    const waves: Array<{ y: number; amplitude: number; speed: number; color: string }> = [
      { y: 0.3, amplitude: 30, speed: 0.02, color: "rgba(212, 166, 37, 0.1)" },
      { y: 0.4, amplitude: 25, speed: 0.025, color: "rgba(139, 105, 20, 0.15)" },
      { y: 0.5, amplitude: 20, speed: 0.03, color: "rgba(212, 166, 37, 0.08)" },
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        
        for (let x = 0; x <= canvas.width; x += 5) {
          const y = 
            canvas.height * wave.y + 
            Math.sin(x * 0.005 + time * wave.speed * 100) * wave.amplitude +
            Math.sin(x * 0.01 + time * wave.speed * 150) * (wave.amplitude * 0.5);
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
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

// Enemy showcase component
function EnemyShowcase() {
  const enemies = [
    { src: "/images/games/rampart/troop-militiaman.png", name: "Club Militia", type: "Basic", threat: "Low", desc: "Basic melee fighter" },
    { src: "/images/games/rampart/troop-axe-goblin.png", name: "Axe Goblin", type: "Enemy", threat: "Medium", desc: "Fast goblin raider" },
    { src: "/images/games/rampart/troop-troll-dog.png", name: "Troll Dog", type: "Beast", threat: "Medium", desc: "Vicious beast unit" },
    { src: "/images/games/rampart/troop-swordsman.png", name: "Chainmail Swordsman", type: "Enemy", threat: "High", desc: "Armored melee elite" },
    { src: "/images/games/rampart/troop-fire-golem.png", name: "Fire Golem", type: "Boss", threat: "High", desc: "Burning elemental" },
    { src: "/images/games/rampart/troop-behemoth.png", name: "Electric Behemoth", type: "Boss", threat: "Extreme", desc: "Massive tank boss" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div className="relative mx-auto max-w-md aspect-square">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-900/20 via-amber-900/10 to-slate-900/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div 
              className="absolute -inset-8 rounded-full blur-3xl transition-colors duration-500"
              style={{
                background: activeIndex >= 4 ? "rgba(220, 38, 38, 0.3)" : activeIndex >= 1 ? "rgba(212, 166, 37, 0.2)" : "rgba(34, 197, 94, 0.2)"
              }}
            />
            <Image
              src={enemies[activeIndex].src}
              alt={enemies[activeIndex].name}
              width={280}
              height={280}
              className="relative drop-shadow-2xl transition-all duration-500 hover:scale-105"
            />
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-slate-950/80 backdrop-blur-sm p-4 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-bold text-white">{enemies[activeIndex].name}</span>
            <span 
              className="px-2 py-0.5 rounded text-xs font-medium"
              style={{
                background: enemies[activeIndex].threat === "Extreme" ? "rgba(220, 38, 38, 0.3)" : enemies[activeIndex].threat === "High" ? "rgba(239, 68, 68, 0.3)" : enemies[activeIndex].threat === "Medium" ? "rgba(234, 179, 8, 0.3)" : "rgba(34, 197, 94, 0.3)",
                color: enemies[activeIndex].threat === "Extreme" ? "rgb(248, 113, 113)" : enemies[activeIndex].threat === "High" ? "rgb(252, 165, 165)" : enemies[activeIndex].threat === "Medium" ? "rgb(253, 224, 71)" : "rgb(134, 239, 172)"
              }}
            >
              {enemies[activeIndex].threat} Threat
            </span>
          </div>
          <p className="text-sm text-white/60">{enemies[activeIndex].desc}</p>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-3 flex-wrap">
        {enemies.map((enemy, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
              activeIndex === index ? "ring-2 ring-amber-500 scale-110" : "opacity-50 hover:opacity-80"
            }`}
          >
            <div className="w-16 h-16 bg-slate-800 relative">
              <Image src={enemy.src} alt={enemy.name} fill className="object-contain p-1" />
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// Import useState
import { useState } from "react";

// Feature card with consistent animation
function FeatureCard({ icon: Icon, title, description, index }: { icon: typeof Shield; title: string; description: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-950/80 border border-white/10 p-6 hover:border-amber-500/30 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <div className="mb-4 inline-flex rounded-xl bg-amber-500/10 p-3">
          <Icon className="h-6 w-6 text-amber-400" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-white/60">{description}</p>
      </div>
    </motion.div>
  );
}

export default function RampartLandingPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <WaveAnimation />

      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/games/rampart/hero-bg.png')",
            filter: "brightness(0.25) saturate(1.2)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />
      </div>

      <div className="relative z-20">
        <nav className="container-px py-6">
          <Link href="/games" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to games
          </Link>
        </nav>

        <section className="container-px py-12 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div 
              ref={heroRef}
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-6 flex items-center gap-4"
              >
                <span className="rounded-full bg-red-500/10 border border-red-500/30 px-3 py-1 text-xs font-medium uppercase tracking-wider text-red-400">
                  Coming Soon
                </span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-4 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
              >
                <span className="block">RAMPART</span>
                <span className="block mt-2 text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400 bg-clip-text text-transparent">
                  Wave Defense
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-8 text-lg text-white/70 leading-relaxed max-w-lg"
              >
                The horde never stops coming. Build your defenses, command your units, 
                and survive wave after wave of relentless enemies in this medieval pixel-art 
                action strategy game.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="max-w-md"
              >
                <WaitlistForm 
                  game="rampart"
                  buttonText="Join Beta"
                  placeholder="Enter email for beta access"
                  successMessage="You're enlisted! Watch for battle orders."
                />
              </motion.div>
            </motion.div>

            <div className="order-1 lg:order-2">
              <EnemyShowcase />
            </div>
          </div>
        </section>

        <section className="container-px py-16 border-t border-white/5">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center mb-12"
          >
            <h2 className="text-2xl font-semibold text-white mb-3">Survive the Onslaught</h2>
            <p className="text-white/50">Wave after wave. How long can you hold?</p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: Shield, title: "Build Defenses", desc: "Walls, towers, and traps to slow the enemy advance" },
              { icon: Target, title: "Command Units", desc: "Deploy archers, knights, and heroes to repel invaders" },
              { icon: Zap, title: "Upgrade & Adapt", desc: "Between waves, strengthen your position for the next assault" },
            ].map((item, i) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl bg-slate-900/50 border border-white/10 p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10">
                  <item.icon className="h-8 w-8 text-amber-400" />
                </div>
                <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-white/50">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="container-px py-16 border-t border-white/5">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center mb-12"
          >
            <h2 className="text-2xl font-semibold text-white mb-3">Features</h2>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard icon={Skull} title="Relentless Waves" description="Enemies come in endless waves, each stronger than the last. No breaks, no mercy." index={0} />
            <FeatureCard icon={Target} title="Strategic Combat" description="Position units, manage resources, and make split-second tactical decisions." index={1} />
            <FeatureCard icon={Shield} title="Base Building" description="Construct walls, towers, and defenses between waves to prepare for the next assault." index={2} />
            <FeatureCard icon={Zap} title="Hero System" description="Unlock powerful heroes with unique abilities to turn the tide of battle." index={3} />
            <FeatureCard icon={Skull} title="Diverse Enemies" description="From goblin scouts to fire-breathing dragons, face a variety of threats." index={4} />
            <FeatureCard icon={Target} title="Pixel Art Style" description="Hand-crafted medieval pixel art with dynamic lighting and effects." index={5} />
          </div>
        </section>

        <section className="container-px py-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-white">Ready to Defend?</h2>
            <p className="mb-8 text-white/60">The first wave is coming. Will you be ready?</p>
            
            <WaitlistForm 
              game="rampart"
              buttonText="Join Beta"
              placeholder="Enter your email"
              successMessage="You're on the list!"
            />
          </motion.div>
        </section>

        <footer className="container-px py-8 border-t border-white/5">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-white/30">© 2025 Go7Studio. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/games" className="text-sm text-white/30 hover:text-white/60">All Games</Link>
              <Link href="/" className="text-sm text-white/30 hover:text-white/60">Go7Studio</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
