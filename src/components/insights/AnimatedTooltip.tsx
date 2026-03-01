"use client";

import { motion, AnimatePresence } from "framer-motion";

export function AnimatedTooltip({
  show,
  x,
  y,
  children,
}: {
  show: boolean;
  x: number;
  y: number;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.96 }}
          transition={{ duration: 0.16, ease: "easeOut" }}
          className="pointer-events-none absolute z-50 rounded-lg border border-white/20 bg-[#020618]/90 px-3 py-2 text-xs text-white/90 shadow-[0_0_18px_rgba(56,189,248,0.2)]"
          style={{ left: `${x}px`, top: `${y}px` }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
