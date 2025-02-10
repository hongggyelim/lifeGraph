import { ChangeEvent, MouseEvent, useState } from "react";
import "./graph.scss";
import Point from "./Point";

interface PointData {
  id: number;
  x: number;
  y: number;
  title: string;
}

const Graph = () => {
  const [points, setPoints] = useState<PointData[]>([]);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints((prev) => [...prev, { id: Date.now(), x, y, title: "" }]); // 클릭한 좌표 저장
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    setPoints((prev) => prev.map((point) => (point.id === id ? { ...point, title: e.target.value } : point)));
  };
  return (
    <div className="graph-container" onClick={handleClick}>
      {points.map((point) => (
        <Point key={point.id} x={point.x} y={point.y} title={point.title} onChange={(e) => handleChange(e, point.id)} />
      ))}
      <div className="graph-upper"></div>
      <div className="graph-below"></div>
    </div>
  );
};

export default Graph;
