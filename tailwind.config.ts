import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#f8f4ec",
        charcoal: "#1f1d1a",
        sand: "#d9c8a6",
        gold: "#b8924f"
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"]
      },
      boxShadow: {
        luxe: "0 20px 60px rgba(20, 15, 5, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
