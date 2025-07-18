import type { BoundStateCreator } from "~/hooks/useBoundStore";

export type Theme = "light" | "dark";

export type ThemeSlice = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const createThemeSlice: BoundStateCreator<ThemeSlice> = (set, get) => ({
  theme: "light",
  setTheme: (theme) => {
    set({ theme });
    // Update document class for Tailwind dark mode
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      // Store in localStorage
      localStorage.setItem("theme", theme);
    }
  },
  toggleTheme: () => {
    const currentTheme = get().theme;
    const newTheme = currentTheme === "light" ? "dark" : "light";
    get().setTheme(newTheme);
  },
});
