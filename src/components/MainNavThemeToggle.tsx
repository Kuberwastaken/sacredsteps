import React from "react";
import { useBoundStore } from "~/hooks/useBoundStore";
import { ThemeToggle } from "./ThemeToggle";

export const MainNavThemeToggle = () => {
  return (
    <div className="fixed top-4 right-4 z-50 sm:hidden">
      <ThemeToggle className="shadow-lg" />
    </div>
  );
};
