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
        primary: {
          DEFAULT: "#8B5CF6",
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
        },
        accent: {
          DEFAULT: "#3B82F6",
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
        bg: {
          DEFAULT: "#05060A",
          muted: "#0B1020",
          card: "rgba(255, 255, 255, 0.06)",
          border: "rgba(255, 255, 255, 0.12)",
        },
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
      },
      animation: {
        "gradient-x": "gradient-x 12s ease infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [
    plugin(({ addComponents, addUtilities, theme }) => {
      addComponents({
        ".glass-card": {
          backgroundColor: theme("colors.bg.card"),
          border: `1px solid ${theme("colors.bg.border")}`,
          borderRadius: theme("borderRadius.xl"),
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
        },
      });

      addUtilities({
        ".text-gradient": {
          backgroundImage:
            "linear-gradient(90deg, #8B5CF6 0%, #3B82F6 50%, #8B5CF6 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        },
      });
    }),
  ],
} satisfies Config;
