import { create } from "zustand";

interface GraphStore {
  mode: "age" | "year";
  scale: number;
  toggleMode: () => void;
  setScale: (scale: number) => void;
}

export const useScaleStore = create<GraphStore>((set) => ({
  mode: "age",
  scale: 5,
  toggleMode: () =>
    set((state) => ({
      mode: state.mode === "age" ? "year" : "age",
      // 현재 mode가 age이면 year로 토글
    })),
  setScale: (scale) =>
    set(() => ({
      scale,
    })),
}));
