"use client";

import { Route } from "@/model/schema/route";
import { InitializeStore } from "./store";
import { ChartLayoutView } from "./tree/chartLayoutView";

export const SitePage = ({ selectedRoute }: { selectedRoute: Route }) => {
  return (
    <InitializeStore selectedRoute={selectedRoute}>
      <ChartLayoutView />
      {selectedRoute && selectedRoute.links}
    </InitializeStore>
  );
};
