import { useEffect, useState } from "react";
import { useGraphStore } from "../../../store/useGraphStore";
import Point from "../../Main/component/Point/Point";

const ResultGraph = () => {
  const { points } = useGraphStore();
  const [data, setData] = useState(points);

  //x 좌표 기준으로 정렬
  useEffect(() => {
    const sorted = [...points].sort((a, b) => a.x - b.x);
    setData(sorted);
  }, []);
  const generatePath = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return ""; // 두 점 이상이 필요

    // Catmull-Rom Spline을 사용하여 점들 사이를 부드럽게 연결
    let path = `M ${points[0].x} ${points[0].y}`; // 첫 번째 점으로 시작

    // 점들 사이의 부드러운 경로 생성
    for (let i = 1; i < points.length - 2; i++) {
      const p0 = points[i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2];

      // Catmull-Rom Spline 공식
      const cx1 = (p0.x + p1.x) / 2;
      const cy1 = (p0.y + p1.y) / 2;
      const cx2 = (p1.x + p2.x) / 2;
      const cy2 = (p1.y + p2.y) / 2;
      const cx3 = (p2.x + p3.x) / 2; // 마지막 제어점
      const cy3 = (p2.y + p3.y) / 2; // 마지막 제어점

      path += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${cx3} ${cy3}, ${p3.x} ${p3.y}`; // Catmull-Rom 곡선 추가
    }

    return path;
  };

  const pathData = generatePath(data);

  return (
    <div className="result-graph-container">
      <svg className="result-graph" width="100%" height="100%">
        <path d={pathData} fill="transparent" stroke="black" strokeWidth="2" />
      </svg>
      {points.map((point) => (
        <Point key={point.id} x={point.x} y={point.y} title={point.title} />
      ))}
    </div>
  );
};

export default ResultGraph;
