"use client";
import { create } from "zustand";

type Path = string[];

type User = {
  selectedItem: Path;
  hoveredItem: Path;
  mouse: {
    x: number;
    y: number;
  };
};

type Store = {
  user: User;
  setUser: (user: User) => void;
};

export const useStore = create<Store>((set) => ({
  user: {
    selectedItem: [],
    hoveredItem: [],
    mouse: {
      x: 0,
      y: 0,
    },
  },
  setUser: (user) => set(() => ({ user })),
}));
