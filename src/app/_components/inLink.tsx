import { getNode } from "@/model/functions/tree/getContentNode";
import Link from "next/link";
import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";
import { useSiteStore } from "./store";

export const CustomLink = (
  props: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
) => {
  let { href, children } = props;
  if (!href) return <>{children}</>;
  // check whether absolute
  if (href.startsWith("http")) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline text-blue-600 dark:text-blue-400 hover:underline"
      >
        {children}
      </Link>
    );
  }
  return <InLink href={href}>{children}</InLink>;
};

export const InLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  href = href.replace(/\/$/, "");

  const { selectedRoute, hoveredRoute } = useSiteStore((state) => state.user);
  const setHoveredRoute = useSiteStore((state) => state.setHoveredRoute);
  const unsetHoveredRoute = useSiteStore((state) => state.unsetHoveredRoute);
  const setSelectedRoute = useSiteStore((state) => state.setSelectedRoute);
  const onMouseEnter = (e: any) => {
    console.log("onMouseEnter");
    e.stopPropagation();
    if (hoveredRoute?.pathname === href) return;
    if (selectedRoute?.pathname === href) return; // don't hover over selected
    setHoveredRoute(getNode(href).value);
  };

  const onMouseLeave = (e: any) => {
    console.log("onMouseLeave");
    e.stopPropagation();
    if (hoveredRoute?.pathname !== href) return;
    unsetHoveredRoute(getNode(href).value);
  };

  const onClick = (e: any) => {
    console.log("onClick");
    e.stopPropagation();
    if (selectedRoute?.pathname === href) return;
    setSelectedRoute(getNode(href).value);
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="inline text-blue-600 dark:text-blue-400 hover:underline"
    >
      {children}
    </button>
  );
};
