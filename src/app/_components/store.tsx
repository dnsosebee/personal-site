"use client";
import { Route } from "@/model/schema/route";
import { create } from "zustand";

type UserFocus = {
  selectedRoute: Route | null;
  hoveredRoute: Route | null;
};

type Store = {
  user: UserFocus;
  setSelectedRoute: (route: Route) => void;
  setHoveredRoute: (route: Route) => void;
  unsetHoveredRoute: (route: Route) => void;
};

export const useSiteStore = create<Store>((set) => ({
  user: {
    selectedRoute: null,
    hoveredRoute: null,
  },
  setSelectedRoute: (route) => {
    console.log("setSelectedRoute", route);
    set((state) => {
      window.history.pushState({}, "", route.pathname);
      return { user: { ...state.user, selectedRoute: route } };
    });
  },
  setHoveredRoute: (route) => {
    console.log("setHoveredRoute", route);
    set((state) => ({
      user: {
        ...state.user,
        hoveredRoute:
          state.user.hoveredRoute?.pathname === route.pathname ? state.user.hoveredRoute : route,
      },
    }));
  },
  unsetHoveredRoute: (route) => {
    console.log("unsetHoveredRoute", route);
    set((state) => ({
      user: {
        ...state.user,
        hoveredRoute:
          state.user.hoveredRoute?.pathname === route.pathname ? null : state.user.hoveredRoute,
      },
    }));
  },
}));

export const useLinks = () => {
  return useSiteStore((state) => ({
    selectionLinks: state.user.selectedRoute?.links?.map((link) => ({
      slug: link,
      // sublinks: getNode("/" + link.join("/")).value.links,
    })),
    hoverLinks: state.user.hoveredRoute?.links?.map((link) => ({
      slug: link,
      // sublinks: getNode("/" + link.join("/")).value.links,
    })),
  }));
};

export const InitializeStore = ({
  selectedRoute,
  children,
}: {
  selectedRoute: Route;
  children: React.ReactNode;
}) => {
  useSiteStore.setState((state) => ({ user: { ...state.user, selectedRoute } }));
  return <>{children}</>;
};
