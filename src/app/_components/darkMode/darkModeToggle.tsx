"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import React from "react";

// import { useColorTheme } from "../_hooks/useColorTheme";

export const DarkModeToggle = () => {
  const [mounted, setMounted] = React.useState(false);
  const [animated, setAnimated] = React.useState(false);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (mounted) {
      setAnimated(true);
    }
  }, [mounted]);

  if (!mounted) {
    return <div className="h-10 w-10"></div>;
  }

  return (
    <div className="h-10 w-10">
      <button
        aria-label="Toggle Dark Mode"
        type="button"
        className="p-2"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
      </button>
    </div>
  );
};
