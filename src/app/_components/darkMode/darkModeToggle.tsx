"use client";

import { useTheme } from "next-themes";

import { DarkModeSwitch } from "react-toggle-dark-mode";
// import { useColorTheme } from "../_hooks/useColorTheme";

export const DarkModeToggle = () => {
  // const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // React.useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) {
  //   return null;
  // }

  return (
    <div className="h-8 w-8">
      <DarkModeSwitch
        style={{ marginBottom: "2rem" }}
        checked={theme === "dark"}
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        size={30}
      />
    </div>
  );
};
