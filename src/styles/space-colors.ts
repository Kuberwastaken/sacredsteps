const spaceColors = {
  // Dark space background
  background: "#0A0F1E",
  
  // Cosmic accents
  surface: {
    primary: "#14192D",
    secondary: "#1C2238",
    tertiary: "#2D324B"
  },

  // Star-like glows
  glow: {
    blue: "#4A9EFF",
    purple: "#9C6ADE",
    green: "#50E3C2"
  },

  // Nebula-inspired gradients
  gradients: {
    cosmic: "linear-gradient(to right, #4A9EFF, #9C6ADE)",
    aurora: "linear-gradient(to right, #50E3C2, #4A9EFF)",
    nebula: "linear-gradient(to right, #9C6ADE, #FF61D8)"
  },

  // UI elements
  border: {
    light: "rgba(255, 255, 255, 0.1)",
    medium: "rgba(255, 255, 255, 0.15)",
    bright: "rgba(255, 255, 255, 0.25)"
  },

  // Text colors
  text: {
    primary: "#FFFFFF",
    secondary: "rgba(255, 255, 255, 0.7)",
    tertiary: "rgba(255, 255, 255, 0.5)"
  }
} as const;

export default spaceColors;
