import { Route } from "@/lib/route-gen";
import { Flowchart } from "./flowchart";
import { InitializeStore } from "./store";

export const SitePage = ({ selectedRoute }: { selectedRoute: Route }) => {
  return (
    <InitializeStore selectedRoute={selectedRoute}>
      <Flowchart />
    </InitializeStore>
  );
};
