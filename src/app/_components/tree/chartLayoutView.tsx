// "use client";
import { chartLayout } from "@/content/layout";
import { Column } from "@/model/schema/tree/nodes/column";
import { ColumnView } from "./columnView";

export const ChartLayoutView = () => {
  return (
    <div
      className="grow space-x-2"
      style={{
        display: "grid",
        gridTemplateColumns:
          chartLayout.children.map((child: Column) => child.weight).join("fr ") + "fr",
      }}
    >
      {chartLayout.children.map((child: Column) => {
        return <ColumnView column={child} key={child.value} />;
      })}
    </div>
  );
};
