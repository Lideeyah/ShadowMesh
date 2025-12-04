import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        foreground: "#EDEDED",
        "shadow-dark": "#0A0A0A",
        "shadow-card": "rgba(255, 255, 255, 0.05)",

        // Brand Colors
        zcash: "#F4B728",
        mina: "#59C2FF", // Neon Blue as requested
        starknet: "#8B5CF6",
        near: "#10B981",
        axelar: "#EC4899",
        fhenix: "#06B6D4",

        // Legacy/Compat
        "electric-blue": "#59C2FF", // Map to Mina Blue for now
        "neon-teal": "#10B981", // Map to NEAR Green
        "privacy-purple": "#8B5CF6", // Map to Starknet Purple
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      backgroundImage: {
        "glass-gradient": "linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
        "glow-radial": "radial-gradient(circle, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
