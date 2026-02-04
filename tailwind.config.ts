import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#070B12",
          900: "#0B1220",
          800: "#0F1A2E",
          700: "#172443",
        },
        text: {
          primary: "#F2F7FF",
          secondary: "#B7C3D6",
          muted: "#7E8CA8",
          link: "#38BDF8",
        },
        brand: {
          pink: "#E879F9",
          orange: "#FB923C",
          blue: "#3B82F6",
          // Legacy colors (keep for backwards compatibility)
          teal: "#2DD4BF",
          sky: "#38BDF8",
          cyan: "#22D3EE",
          lime: "#A3E635",
        },
        state: {
          success: "#22C55E",
          warning: "#F59E0B",
          danger: "#EF4444",
        },
        focusRing: "rgba(45,212,191,0.45)",
        // Back-compat aliases used in existing components
        primary: "#2DD4BF",
        accent: "#38BDF8",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Space Grotesk", "Inter", "ui-sans-serif", "system-ui"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo"],
      },
      borderRadius: {
        "2xl": "18px",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
      },
      animation: {
        "gradient-x": "gradient-x 12s ease infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 1.25s cubic-bezier(0.22, 1, 0.36, 1) infinite",
      },
      boxShadow: {
        glow: "0 12px 30px rgba(45,212,191,0.18)",
      },
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        ".glass-card": {
          backgroundColor: "rgba(17,18,42,0.55)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: "18px",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
          boxSizing: "border-box",
        },
        ".btn-primary": {
          borderRadius: "14px",
          padding: "14px 18px",
          fontWeight: "600",
          color: "#0B1220",
          backgroundImage:
            "linear-gradient(90deg, #E879F9 0%, #FB923C 50%, #3B82F6 100%)",
          boxShadow: "0 12px 30px rgba(251,146,60,0.18)",
          transition: "transform 180ms, filter 180ms, box-shadow 180ms",
        },
        ".btn-primary:hover": {
          transform: "translateY(-1px)",
          filter: "saturate(1.1)",
          boxShadow:
            "0 12px 30px rgba(251,146,60,0.20), 0 0 0 1px rgba(232,121,249,0.20)",
        },
        ".btn-primary:active": {
          transform: "translateY(0)",
          boxShadow: "0 10px 26px rgba(251,146,60,0.16)",
        },
        ".btn-secondary": {
          borderRadius: "14px",
          padding: "14px 18px",
          fontWeight: "600",
          color: "#F5F7FF",
          backgroundColor: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.10)",
          transition: "background-color 180ms, transform 180ms",
        },
        ".btn-secondary:hover": {
          backgroundColor: "rgba(255,255,255,0.09)",
          transform: "translateY(-1px)",
        },
        ".chip": {
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "6px 10px",
          borderRadius: "999px",
          backgroundColor: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.10)",
          fontSize: "12px",
          fontWeight: "500",
          color: "rgba(245,247,255,0.85)",
        },
      });
    }),
  ],
} satisfies Config;
