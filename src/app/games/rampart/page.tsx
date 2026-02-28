"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Sword, Shield, Castle, Sparkles, ChevronRight } from "lucide-react";

// Animated floating particles component
function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;
      color: string;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      size: Math.random() * 3 + 1,
      speedY: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.5 ? "#D4A625" : "#8B6914",
    });

    const init = () => {
      resize();
      particles = Array.from({ length: 30 }, createParticle);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.y -= p.speedY;
        p.opacity -= 0.002;

        if (p.y < -10 || p.opacity <= 0) {
          particles[i] = createParticle();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
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
      style={{ mixBlendMode: "screen" }}
    />
  );
}

// Animated sword slash effect
function SwordSlash({ active }: { active: boolean }) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0"}`}
      style={{
        background: "linear-gradient(135deg, transparent 40%, rgba(212, 166, 37, 0.3) 50%, transparent 60%)",
        transform: active ? "translateX(100%)" : "translateX(-100%)",
        transition: "transform 0.6s ease-out, opacity 0.3s",
      }}
    />
  );
}

// Castle showcase with damage states
function CastleShowcase() {
  const [damageLevel, setDamageLevel] = useState(0);
  const castles = [
    { src: "/images/games/rampart/icon.png", label: "Healthy", color: "#2D5A1E" },
    { src: "/images/games/rampart/castle-damaged.png", label: "Damaged", color: "#8B6914" },
    { src: "/images/games/rampart/castle-critical.png", label: "Critical", color: "#8B1A1A" },
  ];

  return (
    <div className="relative">
      <div className="flex items-center justify-center gap-8">
        {castles.map((castle, index) => (
          <button
            key={index}
            onClick={() => setDamageLevel(index)}
            className={`group relative transition-all duration-500 ${
              damageLevel === index ? "scale-110" : "scale-100 opacity-60 hover:opacity-80"
            }`}
          >
            <div
              className="absolute -inset-4 rounded-full blur-xl transition-opacity duration-500"
              style={{
                background: castle.color,
                opacity: damageLevel === index ? 0.3 : 0,
              }}
            />
            <Image
              src={castle.src}
              alt={`Castle ${castle.label}`}
              width={120}
              height={120}
              className="relative drop-shadow-2xl"
            />
            <span
              className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium transition-all duration-300 ${
                damageLevel === index ? "text-white opacity-100" : "text-white/50 opacity-0"
              }`}
            >
              {castle.label}
            </span>
          </button>
        ))}
      </div>

      {/* Health bar */}
      <div className="mx-auto mt-12 max-w-md">
        <div className="flex items-center justify-between text-xs text-white/60 mb-2">
          <span>Castle Health</span>
          <span>{damageLevel === 0 ? "100%" : damageLevel === 1 ? "50%" : "25%"}</span>
        </div>
        <div className="h-3 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full transition-all duration-700 ease-out rounded-full"
            style={{
              width: damageLevel === 0 ? "100%" : damageLevel === 1 ? "50%" : "25%",
              background: `linear-gradient(90deg, ${castles[damageLevel].color}, ${castles[damageLevel].color}88)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

// Feature card with icon
function FeatureCard({ icon: Icon, title, description, delay }: { icon: React.ComponentType<{ className?: string }>; title: string; description: string; delay: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`glass-card p-6 transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-700/10 p-3">
        <Icon className="h-6 w-6 text-amber-400" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-white/70">{description}</p>
    </div>
  );
}

export default function RampartLandingPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [slashActive, setSlashActive] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setSlashActive(true);
      setTimeout(() => setSlashActive(false), 600);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <FloatingParticles />

      {/* Parallax Background */}
      <div
        ref={heroRef}
        className="fixed inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/games/rampart/hero-bg.png')",
            filter: "brightness(0.4) saturate(1.2)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/60" />
      </div>

      {/* Content */}
      <div className="relative z-20">
        {/* Navigation */}
        <nav className="container-px py-6">
          <Link
            href="/games"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to games
          </Link>
        </nav>

        {/* Hero Section */}
        <section className="container-px py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span className="text-xs font-medium uppercase tracking-wider text-amber-300">
                Coming Soon
              </span>
            </div>

            {/* Title with animation */}
            <h1 className="relative mb-6">
              <span className="block text-6xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
                RAMPART
              </span>
              <span className="absolute -inset-4 blur-3xl opacity-30 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700" />
            </h1>

            <p className="mx-auto mb-4 max-w-2xl text-xl text-amber-100/90 sm:text-2xl">
              Defend Your Kingdom
            </p>

            <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-white/60">
              A medieval tower defense where strategy meets chaos. Build towers, summon heroes, 
              and hold the line against relentless waves of enemies.
            </p>

            {/* CTA */}
            {!submitted ? (
              <form onSubmit={handleSubmit} className="mx-auto max-w-md">
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for early access"
                    className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                    required
                  />
                  <button
                    type="submit"
                    className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-amber-500/25"
                  >
                    <SwordSlash active={slashActive} />
                    <span className="relative flex items-center gap-2">
                      Join Waitlist
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="mx-auto max-w-md rounded-lg border border-green-500/30 bg-green-500/10 px-6 py-4">
                <p className="text-green-400 font-medium">⚔️ You&apos;re on the list!</p>
                <p className="mt-1 text-sm text-white/60">We&apos;ll notify you when Rampart is ready for battle.</p>
              </div>
            )}
          </div>
        </section>

        {/* Castle Damage Showcase */}
        <section className="container-px py-16">
          <div className="glass-card relative overflow-hidden p-8 sm:p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/5 to-transparent" />
            <div className="relative">
              <h2 className="mb-2 text-center text-2xl font-semibold text-white">
                Your Castle. Your Defense.
              </h2>
              <p className="mb-10 text-center text-sm text-white/60">
                Watch your fortress take damage as enemies breach your walls. Can you hold the line?
              </p>
              <CastleShowcase />
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container-px py-16">
          <h2 className="mb-10 text-center text-2xl font-semibold text-white">
            What Awaits in Rampart
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Castle}
              title="Strategic Tower Defense"
              description="Place towers wisely. Archer, Cannon, Mage—each with unique strengths. Create kill zones and chokepoints."
              delay={0}
            />
            <FeatureCard
              icon={Sword}
              title="Hero System"
              description="Summon powerful champions to turn the tide. Level them up, equip gear, and unleash devastating abilities."
              delay={100}
            />
            <FeatureCard
              icon={Shield}
              title="Dynamic Fortress"
              description="Your castle takes real damage. Watch walls crumble and towers fall. Repair, rebuild, and persevere."
              delay={200}
            />
          </div>
        </section>

        {/* Wave Preview */}
        <section className="container-px py-16">
          <div className="glass-card relative overflow-hidden p-8 sm:p-12">
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-amber-900/10" />
            <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="mb-4 text-2xl font-semibold text-white">
                  Face the Horde
                </h2>
                <p className="mb-6 text-white/70 leading-relaxed">
                  From goblin scouts to fire-breathing dragons, each wave brings new challenges. 
                  Adapt your strategy, upgrade your defenses, and survive the onslaught.
                </p>
                <ul className="space-y-3">
                  {[
                    "Wave-based progression with increasing difficulty",
                    "Diverse enemy types with unique behaviors",
                    "Boss battles that test your mastery",
                    "Endless mode for the ultimate challenge",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-white/60">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-amber-900/30 to-slate-900/50">
                <Image
                  src="/images/games/rampart/hero-bg.png"
                  alt="Battlefield"
                  fill
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="mb-2 text-6xl">⚔️</div>
                    <p className="text-sm text-white/50">Battlefield Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="container-px py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">
              The Kingdom Needs You
            </h2>
            <p className="mb-8 text-white/60">
              Join the waitlist and be among the first to defend the realm.
            </p>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="mx-auto max-w-md">
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-amber-500/50 focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-amber-500/25"
                  >
                    Join Waitlist
                  </button>
                </div>
              </form>
            ) : (
              <div className="mx-auto max-w-md rounded-lg border border-green-500/30 bg-green-500/10 px-6 py-4">
                <p className="text-green-400 font-medium">🛡️ You&apos;re enlisted!</p>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="container-px py-8 border-t border-white/10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-white/40">
              © 2025 Go7Studio. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/games" className="text-sm text-white/40 hover:text-white/70">
                All Games
              </Link>
              <Link href="/" className="text-sm text-white/40 hover:text-white/70">
                Go7Studio
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
