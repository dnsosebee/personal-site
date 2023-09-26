import { Route } from "@/model/schema/route";
import dynamic from "next/dynamic";

export const Article = ({ route }: { route: Route }) => {
  const pathnameWithoutTrailingSlash = route.pathname.replace(/\/$/, "");
  const Component = dynamic(() => import(`src/content${pathnameWithoutTrailingSlash}/page.mdx`));
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>{route.metadata.title}</h1>
    </article>
  );
};
