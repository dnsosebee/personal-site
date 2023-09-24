import { routes } from "@/lib/gen/routes";
import { arrayEquals } from "@/lib/helpers";
import { notFound } from "next/navigation";
import { SitePage } from "./sitePage";

export const SiteRouter = ({ params }: { params: { slug: string[] } }) => {
  const selectedRoute = routes.find((route) => arrayEquals(route.slug, params.slug));
  if (!selectedRoute) {
    return notFound();
  }

  return <SitePage selectedRoute={selectedRoute} />;
};
