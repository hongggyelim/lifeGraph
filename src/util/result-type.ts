import { PointData } from "../types/point.type";

/**
 * 그래프 모양을 분석해 인생 유형을 결정한다.
 * 점의 y 비율(0=위, 1=아래)을 -100 ~ 100 점수로 변환해 사용.
 */
export const getResultType = (points: PointData[]): string => {
  if (points.length < 2) return "우상향 가즈아↗️↗️";

  const values = [...points]
    .sort((a, b) => a.x - b.x)
    .map((p) => (0.5 - p.y) * 200);

  const first = values[0];
  const last = values[values.length - 1];
  const diffs = values.slice(1).map((v, i) => v - values[i]);
  const trend = last - first;
  const avgSwing = diffs.reduce((sum, d) => sum + Math.abs(d), 0) / diffs.length;
  const turns = diffs
    .slice(1)
    .filter((d, i) => Math.sign(d) !== 0 && Math.sign(d) !== Math.sign(diffs[i])).length;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
  const minIndex = values.indexOf(min);

  if (diffs.every((d) => d >= 0) && trend > 60) return "승승장구😎";
  if (turns >= 3 && avgSwing > 50) return "끝없는 파도타기🌊";
  if (min < -50 && last > 30) return "넘어져도 다시 일어나기💪";
  if (minIndex > 0 && minIndex < values.length - 1 && last > first) return "비온뒤 맑음🌤️";
  if (trend > 60) return "우상향 가즈아!📈";
  if (trend > 20 && avgSwing < 25) return "안정적인 성장📈";
  if (min >= 0 && mean > 40) return "꽃길만 가득하길🌷";
  if (last === max && max > 50) return "꿈을 향한 질주🏃‍♀️";
  if (turns >= 3) return "다채로운 삶🎨";
  if (avgSwing < 15) return "조화로운 삶🌸";
  if (values.length >= 6) return "끊임없는 도전🚀";
  if (trend > 0 && avgSwing < 40) return "작은 성취의 연속🏅";
  if (trend > 0) return "어제보다 나은 오늘🔥";
  if (turns >= 2) return "변화 속의 성장🍃";
  if (mean > 0) return "즐거움이 가득한 여정🎉";
  if (trend < -20) return "진취적인 개혁가😎";
  return "멋진 인생😎";
};
