import fs from "fs";

import matter from "gray-matter";
import path from "path";

type Route = {
  pathname: string;
  slug: string[]; // same as above
  metadata: any;
  links: string[][];
};

async function getRoutes(dir: string, slug: string[] = []): Promise<Route[]> {
  const files = fs.readdirSync(dir);
  let routes: Route[] = [];

  if (files.find((file) => file === "page.mdx")) {
    const route = [...slug];
    routes.push(await getRoute(route));
  }

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      const nestedRoutes = await getRoutes(filePath, [...slug, file]);
      routes = routes.concat(nestedRoutes);
    }
  }

  return routes;
}

async function getRoute(slug: string[]): Promise<Route> {
  const filePath = `src/content/${slug.join("/")}/page.mdx`;

  const file = fs.readFileSync(filePath, "utf-8");
  // get the url for links that are relative

  const relativeSlugs = file.match(/\]\((?!http)(.*?)\)/g)?.map((link) => {
    const url = link.replace(/\]\(/g, "").replace(/\)/g, "");
    // convert to slug
    const slug = url.split("/").filter((s) => s !== "");

    return slug;
  });
  const parsed = matter(file);
  const metadata = parsed.data;

  return {
    pathname: `/${slug.join("/")}`,
    slug,
    metadata,
    links: relativeSlugs || [],
  };
}

getRoutes("src/content").then((routes: Route[]) => {
  // save to src/content/routes.json
  fs.writeFileSync("src/lib/gen/routes.ts", `export const routes = ${JSON.stringify(routes)}`);
});
