import type { Route } from "@/model/schema/route";
import fs from "fs";

import matter from "gray-matter";
import path from "path";

const PARENT_FOLDER = "src/content";

async function getRoutes(dirslug: string[] = []): Promise<Route[]> {
  const dir = path.join(PARENT_FOLDER, ...dirslug);
  const files = await fs.promises.readdir(dir);
  const routes: Route[] = [];
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = await fs.promises.stat(filePath);
    if (stats.isDirectory()) {
      const children = await getRoutes([...dirslug, file]);
      routes.push(...children);
    } else if (stats.isFile() && file.endsWith(".mdx")) {
      routes.push(await getRoute(dirslug, file));
    }
  }

  return routes;
}

async function getRoute(dirslug: string[], file: string): Promise<Route> {
  const filepath = path.join(PARENT_FOLDER, ...dirslug, file);
  const fileContent = fs.readFileSync(filepath, "utf8");

  const relativeSlugs = fileContent.match(/\]\((?!http)(.*?)\)/g)?.map((link) => {
    const url = link.replace(/\]\(/g, "").replace(/\)/g, "");
    const slug = url.split("/").filter((s) => s !== "");

    return slug;
  });
  const parsed = matter(fileContent);
  const metadata = parsed.data;

  const isIndex = file === "index.mdx";
  const slug = [...dirslug, ...(isIndex ? [] : [file.replace(".mdx", "")])];

  return {
    isIndex,
    pathname: `/${slug.join("/")}`,
    slug,
    metadata,
    links: relativeSlugs || [],
  };
}

getRoutes([]).then((routes: Route[]) => {
  // save to src/content/routes.json
  fs.writeFileSync("src/lib/gen/routes.ts", `export const routes = ${JSON.stringify(routes)}`);
});
