import { ContentNode } from "@/model/schema/tree/nodes/contentNode";

export const ContentNodeView = ({ node }: { node: ContentNode }) => {
  // one grid row per child
  return (
    <div className="grow bg-yellow-100 p-2 flex flex-col space-y-2 border border-black">
      {node.value.metadata.title}
      <p>{node.weight}</p>
      <div
        className="w-full h-full"
        style={{
          display: "grid",
          gridTemplateRows: node.children.map((child) => child.weight).join("fr ") + "fr",
        }}
      >
        {node.children.map((child: ContentNode) => {
          return <ContentNodeView node={child} key={child.value.pathname} />;
        })}
      </div>
    </div>
  );
};
