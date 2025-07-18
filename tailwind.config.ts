import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Space theme colors
        space: {
          bg: "#0A0F1E",
          surface: {
            DEFAULT: "#14192D",
            secondary: "#1C2238",
            tertiary: "#2D324B"
          },
          glow: {
            blue: "#4A9EFF",
            purple: "#9C6ADE",
            green: "#50E3C2"
          },
          border: {
            light: "rgba(255, 255, 255, 0.1)",
            medium: "rgba(255, 255, 255, 0.15)",
            bright: "rgba(255, 255, 255, 0.25)"
          }
        },
        // Maintain light theme colors for graceful degradation
        background: {
          light: "#ffffff",
          dark: "#0A0F1E",
        },
        surface: {
          light: "#f8f9fa",
          dark: "#14192D",
        },
        text: {
          primary: {
            light: "#000000",
            dark: "#ffffff",
          },
          secondary: {
            light: "#666666",
            dark: "rgba(255, 255, 255, 0.7)",
          },
        },
        border: {
          light: "#e0e0e0",
          dark: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
