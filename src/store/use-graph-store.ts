import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PointData } from "../types/point.type";

interface GraphStore {
  points: PointData[];
  addPoint: (point: PointData) => void;
  deletePoint: (targetId: number) => void;
  setTitle: (id: number, title: string) => void;
  resetPoints: () => void;
}

export const useGraphStore = create<GraphStore>()(
  persist(
    (set) => ({
      points: [],
      addPoint: (point) => set((state) => ({ points: [...state.points, point] })),
      deletePoint: (targetId) =>
        set((state) => ({
          points: state.points.filter((point) => point.id !== targetId),
        })),
      setTitle: (id, title) =>
        set((state) => ({
          points: state.points.map((point) =>
            point.id === id ? { ...point, title } : point
          ),
        })),
      resetPoints: () => set({ points: [] }),
    }),
    { name: "life-graph-points" }
  )
);
