import { DarkModeToggle } from "./darkMode/darkModeToggle";

export const Header = () => {
  return (
    <header className="flex space-x-10 items-center">
      <h1>Daniel Sosebee&apos;s Website</h1>
      <DarkModeToggle />
    </header>
  );
};
