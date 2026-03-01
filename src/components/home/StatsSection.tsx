"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Download,
  Star,
  Timer,
  Layers,
  Gamepad2,
  type LucideIcon,
} from "lucide-react";

interface StatItem {
  label: string;
  value: string;
  numericValue: number;
  suffix: string;
  icon: LucideIcon;
}

const stats: StatItem[] = [
  { 
    label: "Total Downloads", 
    value: "50K+", 
    numericValue: 50,
    suffix: "K+",
    icon: Download 
  },
  { 
    label: "Average Rating", 
    value: "4.6★", 
    numericValue: 4.6,
    suffix: "★",
    icon: Star 
  },
  { 
    label: "Sessions Played", 
    value: "1M+", 
    numericValue: 1,
    suffix: "M+",
    icon: Gamepad2 
  },
  { 
    label: "Worlds in Development", 
    value: "3", 
    numericValue: 3,
    suffix: "",
    icon: Layers 
  },
  { 
    label: "Weekly Updates", 
    value: "Active", 
    numericValue: 0,
    suffix: "Active",
    icon: Timer 
  },
];

function AnimatedCounter({ 
  value, 
  suffix, 
  isInView 
}: { 
  value: number; 
  suffix: string;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isInView) return;
    
    if (suffix === "Active") {
      setCount(0);
      return;
    }
    
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Number(current.toFixed(1)));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [isInView, value, suffix]);
  
  if (suffix === "Active") {
    return <span className="text-emerald-400">{suffix}</span>;
  }
  
  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 p-5 transition-all duration-300 hover:border-white/20 hover:-translate-y-1"
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-brand-cyan/20 blur-2xl" />
      </div>
      
      <div className="relative flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-pink/20 via-brand-orange/20 to-brand-blue/20 ring-1 ring-white/10">
          <stat.icon className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-white/50">{stat.label}</p>
          <p className="font-display text-2xl font-bold text-white">
            <AnimatedCounter 
              value={stat.numericValue} 
              suffix={stat.suffix}
              isInView={isInView}
            />
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function StatsSection() {
  return (
    <section className="container-px pb-20">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>
    </section>
  );
}
