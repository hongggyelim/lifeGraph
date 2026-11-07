import { create } from "zustand";
import { persist } from "zustand/middleware";
import { InfoType } from "../types/user-info.type";

interface InfoStore extends InfoType {
  setInfo: (info: InfoType) => void;
}

export const useInfoStore = create<InfoStore>()(
  persist(
    (set) => ({
      name: "",
      birthYear: undefined,
      setInfo: ({ name, birthYear }) => set({ name, birthYear }),
    }),
    { name: "life-graph-info" }
  )
);
