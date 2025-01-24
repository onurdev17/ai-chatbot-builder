import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        "gradient-lr": "linear-gradient(to right, #020004, #05060b)",
        "gradient-bt": "linear-gradient(to top, #23242a, #0a0b0e)",
      },
      colors: {
        "custom-bg": "#091224",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        scanline: "scan 8s linear infinite",
      },
    },
  },

  plugins: [require("tailwindcss-animate")],
} satisfies Config;
