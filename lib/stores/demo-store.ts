'use client';

import { create } from "zustand";

type Role = "customer" | "provider";

type DemoStore = {
  role: Role;
  darkMode: boolean;
  setRole: (role: Role) => void;
  toggleDark: () => void;
};

export const useDemoStore = create<DemoStore>((set) => ({
  role: "customer",
  darkMode: false,
  setRole: (role) => set({ role }),
  toggleDark: () =>
    set((state) => {
      const next = !state.darkMode;
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", next);
      }
      return { darkMode: next };
    })
}));
