import { Route } from "@/lib/route-gen";
import { routes } from "@/lib/gen/routes";

export type FocusProps = {
    selected: Route;
};
export const getNodesAndEdges = ({ selected }: FocusProps) => {
    const nodes = selected.nodes.map((node) => {
        return {
            id: node.id,
            data: node,
            position: {
                x: node.x,
                y: node.y,
            },
        };
    });
    const edges = selected.edges.map((edge) => {
        return {
            id: edge.id,
            source: edge.source,
            target: edge.target,
        };
    });
    return { nodes, edges };
}