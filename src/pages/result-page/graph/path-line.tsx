const PathLine = ({ sortedData }: { sortedData: any }) => {
  const generatePath = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return ""; // 최소 두 점 필요

    let path = `M ${points[0].x} ${points[0].y}`; // 시작점

    if (points.length === 2) {
      // 점이 2개뿐이면 직선 연결
      path += ` L ${points[1].x} ${points[1].y}`;
      return path;
    }

    // Catmull-Rom Spline 보간
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? i : i - 1]; // 이전 점 (처음이면 자기 자신)
      const p1 = points[i]; // 현재 점
      const p2 = points[i + 1]; // 다음 점
      const p3 = points[i + 2 < points.length ? i + 2 : i + 1]; // 다음다음 점 (마지막이면 자기 자신)

      // Catmull-Rom 공식으로 제어점 계산
      const tension = 0.2; // 0에 가까우면 직선
      const cp1x = p1.x + (p2.x - p0.x) * tension;
      const cp1y = p1.y + (p2.y - p0.y) * tension;
      const cp2x = p2.x - (p3.x - p1.x) * tension;
      const cp2y = p2.y - (p3.y - p1.y) * tension;

      // Cubic Bezier 곡선 추가
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }

    return path;
  };
  const pathData = generatePath(sortedData);

  return (
    <svg width="100%" height="100%">
      <path d={pathData} fill="transparent" stroke="black" strokeWidth="2" />
    </svg>
  );
};

export default PathLine;
