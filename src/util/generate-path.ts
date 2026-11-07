interface Coord {
  x: number;
  y: number;
}

const TENSION = 0.2; // 0에 가까우면 직선

/** 정렬된 점들을 Catmull-Rom 스플라인 기반 SVG path로 변환 */
export const generatePath = (points: Coord[]): string => {
  if (points.length < 2) return "";

  let path = `M ${points[0].x} ${points[0].y}`;

  if (points.length === 2) {
    return `${path} L ${points[1].x} ${points[1].y}`;
  }

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(i + 2, points.length - 1)];

    const cp1x = p1.x + (p2.x - p0.x) * TENSION;
    const cp1y = p1.y + (p2.y - p0.y) * TENSION;
    const cp2x = p2.x - (p3.x - p1.x) * TENSION;
    const cp2y = p2.y - (p3.y - p1.y) * TENSION;

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  return path;
};
