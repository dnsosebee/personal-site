"use client"; // because of zustand
import { pn } from "@/lib/pathname";
import { ContentNode } from "@/model/schema/tree/nodes/contentNode";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Article } from "../article";
import { useLinks, useSiteStore } from "../store";

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
    if (hoveredRoute?.pathname === node.value.pathname) return;
    if (selectedRoute?.pathname === node.value.pathname) return; // don't hover over selected
    setHoveredRoute(node.value);
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log("onMouseLeave");
    e.stopPropagation();
    if (hoveredRoute?.pathname !== node.value.pathname) return;
    unsetHoveredRoute(node.value);
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log("onClick");
    e.stopPropagation();
    if (selectedRoute?.pathname === node.value.pathname) return;
    setSelectedRoute(node.value);
  };

  const { hoverLinks, selectionLinks } = useLinks();

  const selected = selectedRoute?.pathname === node.value.pathname;
  const selectedAncestor = node.value.slug.every((slug, index) => {
    return slug === selectedRoute?.slug[index];
  });
  const selectionLink = selectionLinks?.find((link) => pn(link.slug) === node.value.pathname);
  // const secondarySelectionLink = useLinks().selectionLinks?.find((link) =>
  //   link.sublinks.find((sublink) => pn(sublink) === node.value.pathname)
  // );

  const hovered = hoveredRoute?.pathname === node.value.pathname;
  const hoveredAncestor = node.value.slug.every((slug, index) => {
    return slug === hoveredRoute?.slug[index];
  });
  const hoverLink = hoverLinks?.find((link) => pn(link.slug) === node.value.pathname);

  console.log("ContentNodeView", {
    pathname: node.value.pathname,
  });

  const href = type === "link" ? node.value.metadata.url : node.value.pathname;

  return (
    <div
      className={`grow  flex flex-col  shadow-stone-400 ${
        selected
          ? " bg-blue-300 dark:bg-blue-700"
          : selectionLink
          ? " bg-indigo-200 dark:bg-violet-800"
          : hovered
          ? " bg-stone-400 dark:bg-stone-600"
          : hoverLink
          ? "bg-stone-300 dark:bg-stone-700"
          : "bg-stone-200 dark:bg-stone-800"
      }`}
      onMouseOver={onMouseEnter}
      onMouseOut={onMouseLeave}
      onClick={onClick}
      id={node.value.pathname}
    >
      <Link
        href={href}
        className={`px-1 py-0.5 ${hoveredAncestor ? "text-blue-600 dark:text-blue-400" : ""}`}
        target={type === "link" ? "_blank" : ""}
      >
        {node.value.metadata.title}
        {type === "link" ? <ArrowTopRightOnSquareIcon className="w-6 h-6  pl-2 inline" /> : ""}
      </Link>
      <div className="pl-4 flex flex-col gap-2">
        {/* <AnimateChangeInHeight> */}
        {selected && type === "article" && <Article route={node.value} />}
        {/* </AnimateChangeInHeight> */}
        {node.children.length > 0 && (
          <div
            className=""
            // style={{
            //   display: "grid",
            //   gridTemplateRows: node.children.map((child) => child.weight).join("fr ") + "fr",
            // }}
          >
            {node.children.map((child: ContentNode) => {
              return <ContentNodeView node={child} key={child.value.pathname} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};
