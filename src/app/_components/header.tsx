import { DarkModeToggle } from "./darkMode/darkModeToggle";

export const Header = () => {
  return (
    <header className="self-stretch flex space-x-10 items-center h-10">
      {/* <h1>Daniel Sosebee&apos;s Website</h1> */}
      <div className="grow" />
      <DarkModeToggle />
    </header>
  );
};
