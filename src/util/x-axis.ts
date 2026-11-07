export type ScaleMode = "age" | "year";

interface XAxisParams {
  birthYear: number;
  scale: number;
  mode: ScaleMode;
  currentYear?: number;
}

/** x축 눈금 값 목록 (나이 또는 연도) */
export const getXAxis = ({
  birthYear,
  scale,
  mode,
  currentYear = new Date().getFullYear(),
}: XAxisParams): number[] => {
  const age = currentYear - birthYear + 1;
  const xAxis: number[] = [];
  for (let value = 0; value <= age; value += scale) {
    xAxis.push(mode === "age" ? value : birthYear + value);
  }
  return mode === "year" ? xAxis.filter((year) => year <= currentYear) : xAxis;
};
