"use client";
import { Route } from "@/lib/route-gen";
import { create } from "zustand";

type UserFocus = {
  selectedRoute: Route | null;
  hoveredRoute: Route | null;
};

type Store = {
  user: UserFocus;
  setSelectedRoute: (route: Route) => void;
  setHoveredRoute: (route: Route) => void;
};

export const useSiteStore = create<Store>((set) => ({
  user: {
    selectedRoute: null,
    hoveredRoute: null,
  },
  setSelectedRoute: (route) => set((state) => ({ user: { ...state.user, selectedRoute: route } })),
  setHoveredRoute: (route) => set((state) => ({ user: { ...state.user, hoveredRoute: route } })),
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
