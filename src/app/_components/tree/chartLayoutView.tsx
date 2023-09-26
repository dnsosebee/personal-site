// "use client";
import { chartLayout } from "@/content/layout";
import { Column } from "@/model/schema/tree/nodes/column";
import { ColumnView } from "./columnView";

export const Chart = () => {
  return (
    <div
      className="grow bg-green-100 p-2 space-x-2"
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
