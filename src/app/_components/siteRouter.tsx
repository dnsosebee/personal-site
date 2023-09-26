import { routes } from "@/lib/gen/routes";
import { notFound } from "next/navigation";
import { SitePage } from "./sitePage";

export const SiteRouter = ({ params }: { params: { slug: string[] } }) => {
  const selectedRoute = routes.find((route) => route.pathname === `/${params.slug.join("/")}`);
  if (!selectedRoute) {
    return notFound();
  }

  return <SitePage selectedRoute={selectedRoute} />;
};
