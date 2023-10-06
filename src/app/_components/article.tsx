import { articles } from "@/lib/gen/articles";
import { Route } from "@/model/schema/route";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const Article = ({ route }: { route: Route }) => {
  // useEffect(() => {
  //   console.log("Article", { route });
  // }, []);
  // const pathnameWithoutTrailingSlash = route.pathname.replace(/\/$/, "");
  // const url = route.isIndex ? pathnameWithoutTrailingSlash + "/index.mdx" : route.pathname + ".mdx";
  const Component = articles[route.pathname];
  return (
    <main className="p-2  bg-stone-100 dark:bg-stone-900">
      <article className={`${inter.className} prose dark:prose-invert max-w-none`}>
        {/* <h1>{route.metadata.title}</h1> */}
        {/* <React.Suspense fallback={<div>Loading...</div>}> */}
        <Component />
        {/* </React.Suspense> */}
      </article>
    </main>
  );
};
