import { Column } from "@/model/schema/tree/nodes/column";
import { ContentNode } from "@/model/schema/tree/nodes/contentNode";
import { ContentNodeView } from "./contentNodeView";

export const ColumnView = ({ column }: { column: Column }) => {
  return (
    <div
      className="md:w-1/3 grow space-y-2"
      // style={{
      //   display: "grid",
      //   gridTemplateRows:
      //     column.children.map((child: ContentNode) => child.weight).join("fr ") + "fr",
      // }}
    >
      {column.children.map((child: ContentNode) => {
        return <ContentNodeView node={child} key={child.value.pathname} />;
      })}
    </div>
  );
};
