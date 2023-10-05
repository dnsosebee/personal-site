"use client"; // because of zustand
import { ContentNode } from "@/model/schema/tree/nodes/contentNode";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Article } from "../article";
import { useSiteStore } from "../store";

export const ContentNodeView = ({ node }: { node: ContentNode }) => {
  // one grid row per child

  const type = node.value.metadata.type;

  const { selectedRoute, hoveredRoute } = useSiteStore((state) => state.user);
  const setHoveredRoute = useSiteStore((state) => state.setHoveredRoute);
  const unsetHoveredRoute = useSiteStore((state) => state.unsetHoveredRoute);
  const setSelectedRoute = useSiteStore((state) => state.setSelectedRoute);

  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log("onMouseEnter");
    e.stopPropagation();
    setHoveredRoute(node.value);
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log("onMouseLeave");
    e.stopPropagation();
    unsetHoveredRoute(node.value);
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log("onClick");
    e.stopPropagation();
    setSelectedRoute(node.value);
  };

  const selected = selectedRoute?.pathname === node.value.pathname;
  const selectedAncestor = node.value.slug.every((slug, index) => {
    return slug === selectedRoute?.slug[index];
  });
  const hovered = hoveredRoute?.pathname === node.value.pathname;
  const hoveredAncestor = node.value.slug.every((slug, index) => {
    return slug === hoveredRoute?.slug[index];
  });

  console.log("ContentNodeView", {
    pathname: node.value.pathname,
  });

  const href = type === "link" ? node.value.metadata.url : node.value.pathname;

  return (
    <div
      className={`grow py-2 px-2 flex flex-col space-y-2 rounded shadow shadow-stone-400 ${
        selected ? " bg-blue-200 dark:bg-blue-800" : "bg-stone-200 dark:bg-stone-800"
      }`}
      onMouseOver={onMouseEnter}
      onMouseOut={onMouseLeave}
      onClick={onClick}
    >
      <Link
        href={href}
        className={`${hoveredAncestor ? "text-blue-600 dark:text-blue-400" : ""}`}
        target={type === "link" ? "_blank" : ""}
      >
        {node.value.metadata.title}
        {type === "link" ? <ArrowTopRightOnSquareIcon className="w-6 h-6  pl-2 inline" /> : ""}
      </Link>
      {selected && type === "article" && <Article route={node.value} />}
      <div
        className="space-y-2"
        // style={{
        //   display: "grid",
        //   gridTemplateRows: node.children.map((child) => child.weight).join("fr ") + "fr",
        // }}
      >
        {node.children.map((child: ContentNode) => {
          return <ContentNodeView node={child} key={child.value.pathname} />;
        })}
      </div>
    </div>
  );
};
