import fs from "fs";
import path from "path";

function getRoutes(dir: string, folder = ""): any {
  console.log("here");
  const files = fs.readdirSync(dir);
  let routes: string[] = [];

  console.log({ files });
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      const nestedRoutes = getRoutes(filePath, `${folder}/${file}`);
      routes = routes.concat(nestedRoutes);
    } else if (stat.isFile() && file.endsWith(".mdx")) {
      const route = `${folder}/`;
      routes.push(route);
    }
  }

  return routes;
}

const routes = getRoutes("src/content");
console.log(JSON.stringify(routes, null, 2));
