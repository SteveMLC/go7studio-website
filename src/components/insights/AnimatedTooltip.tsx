"use client";

import { motion, AnimatePresence } from "framer-motion";

interface AnimatedTooltipProps {
  children: React.ReactNode;
  show: boolean;
  x: number;
  y: number;
  className?: string;
}

export function AnimatedTooltip({ 
  children, 
  show,
  x,
  y,
  className = ""
}: AnimatedTooltipProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 5 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={`pointer-events-none absolute z-50 rounded-lg border border-white/20 bg-[#020618]/90 px-3 py-2 text-xs text-white/90 shadow-[0_0_18px_rgba(56,189,248,0.2)] backdrop-blur-sm ${className}`}
          style={{ left: x, top: y }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
