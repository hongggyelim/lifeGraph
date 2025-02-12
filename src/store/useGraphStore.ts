import { create } from "zustand";

interface PointData {
  id: number;
  x: number;
  y: number;
  title: string;
}

interface GraphStore {
  points: PointData[];
  addPoint: (point: PointData) => void;
  deletePoint: (targetId: number) => void;
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
  setTitle: (id, title) =>
    set((state) => ({
      points: state.points.map((point) => (point.id === id ? { ...point, title } : point)),
    })),
  resetPoints: () => set({ points: [] }),
}));
