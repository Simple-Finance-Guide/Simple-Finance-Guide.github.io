import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}", "./content/**/*.{json,md}"],
  theme: {
    extend: {
      colors: {
        ink: "#17201b",
        muted: "#5c6b62",
        finance: {
          50: "#effaf3",
          100: "#d9f2e1",
          500: "#198754",
          600: "#147044",
          700: "#0f5a37"
        },
        paper: "#fbfdfb"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 20px 60px rgba(23, 32, 27, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
