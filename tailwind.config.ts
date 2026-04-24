import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gakushuin: {
          DEFAULT: "#004831",
          deep: "#005A3C",
          light: "#1E6B4F",
        },
        gold: {
          DEFAULT: "#FFD700",
          dark: "#FFB800",
          light: "#FFED4E",
          deep: "#B8860B",
        },
        pachiRed: {
          DEFAULT: "#E60012",
          dark: "#A00000",
          light: "#FF3355",
        },
        pachiBlack: "#0B0B0F",
        offwhite: "#F7F7F2",
        sakura: "#F4C2C2",
      },
      fontFamily: {
        sans: [
          "var(--font-noto-sans-jp)",
          "var(--font-inter)",
          "system-ui",
          "sans-serif",
        ],
        serif: [
          "var(--font-noto-serif-jp)",
          "serif",
        ],
        gokubuto: [
          "var(--font-kaisei-tokumin)",
          "var(--font-noto-serif-jp)",
          "serif",
        ],
      },
      boxShadow: {
        card: "0 10px 30px -10px rgba(0, 72, 49, 0.25)",
        neon: "0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(230, 0, 18, 0.5)",
        jackpot:
          "0 0 40px rgba(255, 215, 0, 1), 0 0 80px rgba(230, 0, 18, 0.8), inset 0 0 20px rgba(255, 215, 0, 0.5)",
      },
      animation: {
        "marquee-lights": "marquee-lights 0.6s ease-in-out infinite",
        "gold-pulse": "gold-pulse 1.2s ease-in-out infinite",
        "jackpot-bounce": "jackpot-bounce 0.5s ease-in-out infinite",
        shake: "shake 0.15s linear infinite",
        "radial-burst": "radial-burst 3s linear infinite",
        "neon-border": "neon-border 0.8s ease-in-out infinite",
        "symbol-cycle": "symbol-cycle 0.1s steps(1) infinite",
        "lock-in": "lock-in 0.3s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
