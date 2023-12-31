import { routes } from "@/lib/gen/routes";
import { getNode } from "@/model/functions/tree/getContentNode";
import { withWeight } from "@/model/functions/tree/withWeight";
import { Route } from "@/model/schema/route";
import { ChartLayout } from "@/model/schema/tree/nodes/chartLayout";

const root = routes.find((r: Route) => r.pathname === "/");
const about = getNode("/about");
const skillsAndInterests = getNode("/interests");
const projects = getNode("/projects");
const testimonials = getNode("/testimonials");
const writings = getNode("/writings");
const code = getNode("/code");

if (!root || !about || !skillsAndInterests || !projects || !testimonials || !writings || !code) {
  throw new Error("Missing layout routes");
}

export const chartLayout: ChartLayout = withWeight({
  value: root,
  children: [
    withWeight({
      value: "left",
      children: [about, skillsAndInterests],
    }),
    withWeight({
      value: "center",
      children: [projects],
    }),
    withWeight({
      value: "right",
      children: [testimonials, writings, code],
    }),
  ],
});

console.log({ chartLayout: JSON.stringify(chartLayout, null, 2) });
