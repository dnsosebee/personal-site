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
  setSelectedRoute: (route) =>
    set((state) => {
      window.history.pushState({}, "", route.pathname);
      return { user: { ...state.user, selectedRoute: route } };
    }),
  setHoveredRoute: (route) =>
    set((state) => {
      return { user: { ...state.user, hoveredRoute: route } };
    }),
  unsetHoveredRoute: (route) =>
    set((state) => ({
      user: {
        ...state.user,
        hoveredRoute:
          state.user.hoveredRoute?.pathname === route.pathname ? null : state.user.hoveredRoute,
      },
    })),
}));

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
