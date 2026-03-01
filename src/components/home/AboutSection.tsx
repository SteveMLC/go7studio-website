"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Rocket, Palette, Code, Zap, Users, Trophy } from "lucide-react";

const values = [
  {
    icon: Palette,
    title: "Fun + UX First",
    description: "Delightful experiences that still respect the user. No dark patterns, just honest design.",
    color: "from-brand-pink/20 to-brand-pink/5",
  },
  {
    icon: Code,
    title: "Polish Matters",
    description: "Motion, feedback, and clarity make the difference between good and great.",
    color: "from-brand-orange/20 to-brand-orange/5",
  },
  {
    icon: Rocket,
    title: "Ship, Learn, Improve",
    description: "Launch early, iterate fast, and improve continuously based on real feedback.",
    color: "from-brand-blue/20 to-brand-blue/5",
  },
];

const services = [
  { icon: Zap, text: "Mobile Game Dev" },
  { icon: Users, text: "Roblox Experiences" },
  { icon: Trophy, text: "UX Consulting" },
  { icon: Code, text: "Flutter Apps" },
];

function ValueCard({ value, index }: { value: typeof values[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 p-6 transition-all duration-300 hover:border-white/20"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
      
      <div className="relative">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110">
          <value.icon className="h-6 w-6 text-white" />
        </div>
        
        <h3 className="mb-2 text-lg font-semibold text-white">{value.title}</h3>
        <p className="text-sm leading-relaxed text-white/60">{value.description}</p>
      </div>
    </motion.div>
  );
}

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section id="about" className="container-px py-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* Left column - Story */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/70 ring-1 ring-white/10">
            <Image
              src="/images/branding/go7studio-logo-square.png"
              alt="Go7Studio"
              width={16}
              height={16}
              className="rounded"
            />
            About Go7Studio
          </div>
          
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Small studio.
            <br />
            <span className="text-gradient">High polish.</span>
            <br />
            Built for momentum.
          </h2>
          
          <div className="mt-6 space-y-4 text-base leading-relaxed text-white/70">
            <p>
              We&apos;re a hands-on team building games and apps with obsessive focus 
              on usability, performance, and feel.
            </p>
            <p>
              From mobile tycoons to Roblox experiences, every project follows 
              the same principles: clear UX, satisfying feedback, and shipping real value.
            </p>
          </div>

          {/* Services pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {services.map((service) => (
              <span
                key={service.text}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/70 ring-1 ring-white/10"
              >
                <service.icon className="h-3.5 w-3.5" />
                {service.text}
              </span>
            ))}
          </div>
          
          <div className="mt-8">
            <Link
              href="/services"
              className="btn-secondary inline-flex items-center gap-2"
            >
              Explore Services
            </Link>
          </div>
        </motion.div>

        {/* Right column - Values */}
        <div className="space-y-4">
          {values.map((value, index) => (
            <ValueCard key={value.title} value={value} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
