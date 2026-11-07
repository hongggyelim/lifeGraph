import { useInfoStore } from "../store/use-info-store";
import { useScaleStore } from "../store/use-scale-store";
import { getXAxis } from "../util/x-axis";

const DEFAULT_BIRTH_YEAR = 1990;

const useInfo = () => {
  const name = useInfoStore((state) => state.name) || "유저";
  const birthYear = useInfoStore((state) => state.birthYear) ?? DEFAULT_BIRTH_YEAR;
  const scale = useScaleStore((state) => state.scale);
  const mode = useScaleStore((state) => state.mode);

  const xAxis = getXAxis({ birthYear, scale, mode });

  return { name, birthYear, xAxis };
};

export default useInfo;
