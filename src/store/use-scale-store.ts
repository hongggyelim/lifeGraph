import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ScaleMode } from "../util/x-axis";

interface ScaleStore {
  mode: ScaleMode;
  scale: number;
  setMode: (mode: ScaleMode) => void;
  setScale: (scale: number) => void;
}

export const useScaleStore = create<ScaleStore>()(
  persist(
    (set) => ({
      mode: "age",
      scale: 5,
      setMode: (mode) => set({ mode }),
      setScale: (scale) => set({ scale }),
    }),
    { name: "life-graph-scale" }
  )
);
