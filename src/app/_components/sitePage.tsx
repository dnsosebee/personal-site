import { Route } from "@/lib/route-gen";
import dynamic from "next/dynamic";
import { Article } from "./article";

export const SitePage = ({ route }: { route: Route }) => {
  const pathnameWithoutTrailingSlash = route.pathname.replace(/\/$/, "");
  const Component = dynamic(() => import(`src/content${pathnameWithoutTrailingSlash}/page.mdx`));

  return (
    <Article>
      <h1>{route.metadata.title}</h1>
      <Component />
    </Article>
  );
};
