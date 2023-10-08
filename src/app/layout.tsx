import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import React from "react";
import { ThemeProvider } from "./_components/darkMode/themeProvider";
import { Header } from "./_components/header";
import "./globals.css";

const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daniel Sosebee's Portfolio",
  description:
    "An interactive flowchart representation of Daniel Sosebee's projects and interests.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 flex flex-col h-screen w-screen items-stretch`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
