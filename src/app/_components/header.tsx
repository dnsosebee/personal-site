import Link from "next/link";
import { DarkModeToggle } from "./darkMode/darkModeToggle";

export const Header = () => {
  return (
    <header className="self-stretch flex items-center h-10">
      <Link href="/">
        <h1 className="pl-2 pt-2">Daniel Sosebee&apos;s Portfolio</h1>
      </Link>
      <div className="h-10 grow" />
      <DarkModeToggle />
    </header>
  );
};
