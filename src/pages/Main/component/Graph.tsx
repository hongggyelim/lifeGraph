import { useState } from "react";
import "./graph.scss";
import Point from "./Point";

const Graph = ({ onClick }: { onClick: (x: number, y: number) => void }) => {
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setPoints((prev) => [...prev, { x, y }]); // 클릭한 좌표 저장
  };
  return (
    <div className="graph-container" onClick={handleClick}>
      {points.map((point, index) => (
        <Point key={index} x={point.x} y={point.y} />
      ))}
      <div className="graph-upper"></div>
      <div className="graph-below"></div>
    </div>
  );
};

export default Graph;
