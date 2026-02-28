"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Skull, Shield, Zap, Target, ChevronRight } from "lucide-react";

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
    { 
      src: "/images/games/rampart/militia-archer.png", 
      name: "Archer", 
      type: "Militia",
      threat: "Low",
      desc: "Quick attacks from range"
    },
    { 
      src: "/images/games/rampart/enemy-orc.png", 
      name: "Orc Raider", 
      type: "Enemy",
      threat: "Medium",
      desc: "Brutal melee damage"
    },
    { 
      src: "/images/games/rampart/enemy-wolf.png", 
      name: "Dire Wolf", 
      type: "Enemy",
      threat: "Medium",
      desc: "Fast and ferocious"
    },
    { 
      src: "/images/games/rampart/enemy-skeleton.png", 
      name: "Skeleton", 
      type: "Undead",
      threat: "Medium",
      desc: "Relentless undead horde"
    },
    { 
      src: "/images/games/rampart/enemy-behemoth.png", 
      name: "Behemoth", 
      type: "Boss",
      threat: "High",
      desc: "Massive tank unit"
    },
    { 
      src: "/images/games/rampart/enemy-dragon.png", 
      name: "Dragon", 
      type: "Boss",
      threat: "Extreme",
      desc: "Fire-breathing nightmare"
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative">
      {/* Main showcase */}
      <div className="relative mx-auto max-w-md aspect-square">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-900/20 via-amber-900/10 to-slate-900/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Glow effect */}
            <div 
              className="absolute -inset-8 rounded-full blur-3xl transition-colors duration-500"
              style={{
                background: activeIndex >= 4 
                  ? "rgba(220, 38, 38, 0.3)" 
                  : activeIndex >= 1 
                    ? "rgba(212, 166, 37, 0.2)" 
                    : "rgba(34, 197, 94, 0.2)"
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

        {/* Stats overlay */}
        <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-slate-950/80 backdrop-blur-sm p-4 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-bold text-white">{enemies[activeIndex].name}</span>
            <span 
              className="px-2 py-0.5 rounded text-xs font-medium"
              style={{
                background: enemies[activeIndex].threat === "Extreme" 
                  ? "rgba(220, 38, 38, 0.3)"
                  : enemies[activeIndex].threat === "High"
                    ? "rgba(239, 68, 68, 0.3)"
                    : enemies[activeIndex].threat === "Medium"
                      ? "rgba(234, 179, 8, 0.3)"
                      : "rgba(34, 197, 94, 0.3)",
                color: enemies[activeIndex].threat === "Extreme" 
                  ? "rgb(248, 113, 113)"
                  : enemies[activeIndex].threat === "High"
                    ? "rgb(252, 165, 165)"
                    : enemies[activeIndex].threat === "Medium"
                      ? "rgb(253, 224, 71)"
                      : "rgb(134, 239, 172)"
              }}
            >
              {enemies[activeIndex].threat} Threat
            </span>
          </div>          <p className="text-sm text-white/60">{enemies[activeIndex].desc}</p>
        </div>
      </div>

      {/* Thumbnail selector */}
      <div className="mt-8 flex justify-center gap-3 flex-wrap">
        {enemies.map((enemy, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
              activeIndex === index 
                ? "ring-2 ring-amber-500 scale-110" 
                : "opacity-50 hover:opacity-80"
            }`}
          >
            <div className="w-16 h-16 bg-slate-800 relative">
              <Image
                src={enemy.src}
                alt={enemy.name}
                fill
                className="object-contain p-1"
              />
            </div>
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-white/70 whitespace-nowrap">
              {enemy.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Wave counter animation
function WaveCounter() {
  const [wave, setWave] = useState(1);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setWave(w => (w >= 99 ? 1 : w + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-3 rounded-2xl bg-slate-950/60 backdrop-blur border border-red-500/30 px-5 py-3">
      <Skull className="h-5 w-5 text-red-500" />
      <div>
        <p className="text-[10px] uppercase tracking-wider text-white/50">Wave Incoming</p>
        <p className="text-2xl font-bold text-white tabular-nums">
          {wave.toString().padStart(2, '0')}
        </p>
      </div>
    </div>
  );
}

// Feature card
function FeatureCard({ icon: Icon, title, description }: { icon: React.ComponentType<{ className?: string }>; title: string; description: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-950/80 border border-white/10 p-6 hover:border-amber-500/30 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <div className="mb-4 inline-flex rounded-xl bg-amber-500/10 p-3">
          <Icon className="h-6 w-6 text-amber-400" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-white/60">{description}</p>
      </div>
    </div>
  );
}

export default function RampartLandingPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <WaveAnimation />

      {/* Background layers */}
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
              <div className="mb-6 flex items-center gap-4">
                <span className="rounded-full bg-red-500/10 border border-red-500/30 px-3 py-1 text-xs font-medium uppercase tracking-wider text-red-400">
                  Coming Soon
                </span>
                <WaveCounter />
              </div>

              <h1 className="mb-4 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                <span className="block">RAMPART</span>
                <span className="block mt-2 text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400 bg-clip-text text-transparent">
                  Wave Defense
                </span>
              </h1>

              <p className="mb-8 text-lg text-white/70 leading-relaxed max-w-lg">
                The horde never stops coming. Build your defenses, command your units, 
                and survive wave after wave of relentless enemies in this medieval pixel-art 
                action strategy game.
              </p>

              <div className="flex flex-wrap gap-4">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="flex-1 max-w-sm">
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email for beta access"
                        className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-amber-500/50 focus:outline-none"
                        required
                      />
                      <button
                        type="submit"
                        className="group rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 px-5 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-amber-500/25"
                      >
                        <span className="flex items-center gap-1">
                          Join
                          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-5 py-3">
                    <p className="text-green-400 font-medium text-sm">🛡️ You&apos;re enlisted! Watch for battle orders.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <EnemyShowcase />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="container-px py-16 border-t border-white/5">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-2xl font-semibold text-white mb-3">Survive the Onslaught</h2>
            <p className="text-white/50">Wave after wave. How long can you hold?</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="relative">
              <div className="absolute top-8 left-full w-full h-px bg-gradient-to-r from-amber-500/50 to-transparent hidden sm:block" />
              <div className="rounded-2xl bg-slate-900/50 border border-white/10 p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10">
                  <Shield className="h-8 w-8 text-amber-400" />
                </div>
                <h3 className="mb-2 font-semibold text-white">Build Defenses</h3>
                <p className="text-sm text-white/50">Walls, towers, and traps to slow the enemy advance</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute top-8 left-full w-full h-px bg-gradient-to-r from-amber-500/50 to-transparent hidden sm:block" />
              <div className="rounded-2xl bg-slate-900/50 border border-white/10 p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10">
                  <Target className="h-8 w-8 text-amber-400" />
                </div>
                <h3 className="mb-2 font-semibold text-white">Command Units</h3>
                <p className="text-sm text-white/50">Deploy archers, knights, and heroes to repel invaders</p>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900/50 border border-white/10 p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10">
                <Zap className="h-8 w-8 text-amber-400" />
              </div>
              <h3 className="mb-2 font-semibold text-white">Upgrade & Adapt</h3>
              <p className="text-sm text-white/50">Between waves, strengthen your position for the next assault</p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container-px py-16 border-t border-white/5">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-2xl font-semibold text-white mb-3">Features</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Skull}
              title="Relentless Waves"
              description="Enemies come in endless waves, each stronger than the last. No breaks, no mercy."
            />
            <FeatureCard
              icon={Target}
              title="Strategic Combat"
              description="Position units, manage resources, and make split-second tactical decisions."
            />
            <FeatureCard
              icon={Shield}
              title="Base Building"
              description="Construct walls, towers, and defenses between waves to prepare for the next assault."
            />
            <FeatureCard
              icon={Zap}
              title="Hero System"
              description="Unlock powerful heroes with unique abilities to turn the tide of battle."
            />
            <FeatureCard
              icon={Skull}
              title="Diverse Enemies"
              description="From goblin scouts to fire-breathing dragons, face a variety of threats."
            />
            <FeatureCard
              icon={Target}
              title="Pixel Art Style"
              description="Hand-crafted medieval pixel art with dynamic lighting and effects."
            />
          </div>
        </section>

        {/* Castle State */}
        <section className="container-px py-16 border-t border-white/5">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent" />
            
            <div className="relative grid gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="mb-4 text-3xl font-bold text-white">Your Castle is Your Life</h2>                <p className="mb-6 text-white/60 leading-relaxed">
                  Watch your fortress take damage in real-time. Every hit matters. 
                  When the walls fall, the kingdom falls with them. Repair, rebuild, 
                  and fight on—or watch everything crumble.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[
                      "/images/games/rampart/icon.png",
                      "/images/games/rampart/castle-damaged.png", 
                      "/images/games/rampart/castle-critical.png"
                    ].map((src, i) => (
                      <div key={i} className="h-12 w-12 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden">
                        <Image src={src} alt="" width={48} height={48} className="object-contain" />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-white/40">3 damage states</span>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-8 rounded-full bg-red-500/20 blur-3xl" />
                  <Image
                    src="/images/games/rampart/castle-critical.png"
                    alt="Critical castle state"
                    width={200}
                    height={200}
                    className="relative drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="container-px py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">Ready to Defend?</h2>
            <p className="mb-8 text-white/60">
              The first wave is coming. Will you be ready?
            </p>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="mx-auto max-w-sm">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-amber-500/50 focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-amber-500/25"
                  >
                    Join Beta
                  </button>
                </div>
              </form>
            ) : (
              <div className="mx-auto max-w-sm rounded-xl border border-green-500/30 bg-green-500/10 px-6 py-4">
                <p className="text-green-400 font-medium">⚔️ You&apos;re on the list!</p>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="container-px py-8 border-t border-white/5">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-white/30">
              © 2025 Go7Studio. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/games" className="text-sm text-white/30 hover:text-white/60">
                All Games
              </Link>
              <Link href="/" className="text-sm text-white/30 hover:text-white/60">
                Go7Studio
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
