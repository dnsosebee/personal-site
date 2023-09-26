import { Tree } from "@/model/schema/tree/tree";

export const withWeight = <V, C extends Tree<any, any>>(
  partial: Omit<Tree<V, C>, "weight">
): Tree<V, C> => ({
  ...partial,
  weight: partial.children.reduce((acc, child) => acc + child.weight, 1),
});
