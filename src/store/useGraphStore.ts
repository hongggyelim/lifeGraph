import { create } from "zustand";
import { PointData } from "../types/pointType";

interface GraphStore {
  points: PointData[];
  addPoint: (point: PointData) => void;
  deletePoint: (targetId: number) => void;
  setPoints: (newPoints: PointData[]) => void;
  setTitle: (id: number, title: string) => void;
  resetPoints: () => void;
}

export const useGraphStore = create<GraphStore>((set) => ({
  points: [],
  addPoint: (point) => set((state) => ({ points: [...state.points, point] })),
  deletePoint: (targetId) =>
    set((state) => ({
      points: state.points.filter((point) => point.id !== targetId),
    })),
  setPoints: (newPoints) =>
    set(() => ({
      points: newPoints,
    })),
  setTitle: (id, title) =>
    set((state) => ({
      points: state.points.map((point) => (point.id === id ? { ...point, title } : point)),
    })),
  resetPoints: () => set({ points: [] }),
}));
