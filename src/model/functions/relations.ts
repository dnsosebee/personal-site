import { Route, Slug } from "../schema/route";

export const isDirectChild = (parent: Route) => (potentialDirectChild: Route) => {
  if (potentialDirectChild.slug.length !== parent.slug.length + 1) return false;
  for (let i = 0; i < parent.slug.length; i++) {
    if (potentialDirectChild.slug[i] !== parent.slug[i]) return false;
  }
  return true;
};

export const slugEqual = (a: Slug, b: Slug) => {
  return a.length === b.length && a.every((v, i) => v === b[i]);
};
