import { routes } from "@/lib/gen/routes";
import { Route } from "../../schema/route";
import { ContentNode } from "../../schema/tree/nodes/contentNode";
import { isDirectChild } from "../relations";
import { withWeight } from "./withWeight";

const getNodeFromRoute = (route: Route): ContentNode => {
  const children = routes.filter((r) => isDirectChild(route)(r)).map(getNodeFromRoute);
  return withWeight({ value: route, children });
};

export const getNode = (pathname: string): ContentNode => {
  const route = routes.find((r) => r.pathname === pathname);
  if (!route) throw new Error(`No route found for pathname: ${pathname}`);
  return getNodeFromRoute(route);
};

// const getRouteTreeMap = (routeTree: ContentNode): ContentNodeMap => {
//   const map = new Map<string, ContentNode>();
//   const stack = [routeTree];
//   while (stack.length) {
//     const node = stack.pop();
//     if (!node) continue;
//     map.set(node.value.pathname, node);
//     stack.push(...node.children);
//   }
//   return map;
// };

// export const routeTree = getTree(routes[0]);

// export const routeTreeMap = getRouteTreeMap(routeTree);
