import { Route } from "@/model/schema/route";
import { InitializeStore } from "./store";
import { Chart } from "./tree/chartLayoutView";

export const SitePage = ({ selectedRoute }: { selectedRoute: Route }) => {
  return (
    <InitializeStore selectedRoute={selectedRoute}>
      <Chart />
    </InitializeStore>
  );
};
