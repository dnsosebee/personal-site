import { routes } from "@/lib/gen/routes";
import { arrayEquals } from "@/lib/helpers";
import { notFound } from "next/navigation";
import { SitePage } from "./sitePage";

export const SiteRouter = ({ params }: { params: { slug: string[] } }) => {
  const route = routes.find((route) => arrayEquals(route.slug, params.slug));
  if (!route) {
    return notFound();
  }

  return <SitePage route={route} />;
};
