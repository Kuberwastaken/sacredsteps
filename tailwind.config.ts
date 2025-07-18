import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Light theme colors
        background: {
          light: "#ffffff",
          dark: "#1a1a1a",
        },
        surface: {
          light: "#f8f9fa",
          dark: "#2d2d2d",
        },
        text: {
          primary: {
            light: "#000000",
            dark: "#ffffff",
          },
          secondary: {
            light: "#666666",
            dark: "#cccccc",
          },
        },
        border: {
          light: "#e0e0e0",
          dark: "#404040",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
