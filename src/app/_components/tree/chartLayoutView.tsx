// "use client";
import { chartLayout } from "@/content/layout";
import { pn } from "@/lib/pathname";
import { Slug } from "@/model/schema/route";
import { Column } from "@/model/schema/tree/nodes/column";
import { useTheme } from "next-themes";
import XArrow from "react-xarrows";
import { useLinks, useSiteStore } from "../store";
import { ColumnView } from "./columnView";

export const ChartLayoutView = () => {
  // const { selectedRoute, hoveredRoute } = useSiteStore((state) => state.user);

  const { selectedRoute, hoveredRoute } = useSiteStore((state) => state.user);
  const { selectionLinks, hoverLinks } = useLinks();
  console.log({ selectionLinks });

  return (
    <div
      className="grow flex p-6 gap-6 max-w-[120rem] "
      // style={{
      //   display: "grid",
      //   gridTemplateColumns:
      //     chartLayout.children.map((child: Column) => child.weight).join("fr ") + "fr",
      // }}
    >
      {chartLayout.children.map((child: Column) => {
        return <ColumnView column={child} key={child.value} />;
      })}
      {selectedRoute &&
        selectionLinks?.map((link, i) => {
          return (
            <>
              <Arrow one={selectedRoute!.slug} two={link.slug} key={i} hover={false} />
              {/* {link.sublinks.map((sublink, j) => {
                return <Arrow one={link.slug} two={sublink} key={j} hover={false} />;
              })} */}
            </>
          );
        })}
      {hoveredRoute &&
        hoverLinks?.map((link, i) => {
          return (
            <>
              <Arrow one={hoveredRoute!.slug} two={link.slug} key={i} hover={true} />
              {/* {link.sublinks.map((sublink, j) => {
                return <Arrow one={link.slug} two={sublink} key={j} hover={true} />;
              })} */}
            </>
          );
        })}
    </div>
  );
};

const Arrow = ({ one, two, hover = true }: { one: Slug; two: Slug; hover?: boolean }) => {
  const { theme } = useTheme();
  console.log("Arrow", { one, two });
  const one_col_idx = chartLayout.children.findIndex((col) =>
    col.children.find((c) => c.value.slug[0] === one[0])
  );
  const two_col_idx = chartLayout.children.findIndex((col) =>
    col.children.find((c) => c.value.slug[0] === two[0])
  );

  if (one_col_idx === -1 || two_col_idx === -1) {
    throw new Error(`Column not found for ${one} or ${two}`);
  }

  if (one_col_idx === two_col_idx) {
    return null;
  }

  const color = hover ? (theme === "dark" ? "white" : "black") : "gray";

  const start = one_col_idx < two_col_idx ? one : two;
  const end = one_col_idx < two_col_idx ? two : one;
  const xArrowProps = {
    key: crypto.getRandomValues(new Uint32Array(1))[0],
    start: pn(start),
    end: pn(end),
    startAnchor: "right" as const,
    endAnchor: "left" as const,
    color,
    strokeWidth: 2,
  };
  return <XArrow {...xArrowProps} />;
};
