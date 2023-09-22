import { routes } from "@/lib/gen/routes";
import { arrayEquals } from "@/lib/helpers";
import { notFound } from "next/navigation";
import { Article } from "./article";

export const SiteRouter = ({ params }: { params: { slug: string[] } }) => {
  const route = routes.find((route) => arrayEquals(route.slug, params.slug));
  if (!route) {
    return notFound();
  }

  return (
    <Article>
      <h1>Page: {JSON.stringify(route)}</h1>
    </Article>
  );
};
