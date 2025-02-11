import { ChangeEvent, MouseEvent, useEffect, useRef } from "react";
import "./graph.scss";
import Point from "../Point/Point";
import { useGraphStore } from "../../../../store/useGraphStore";

const Graph = () => {
  const { points, addPoint, setTitle } = useGraphStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    addPoint({ id: Date.now(), x, y, title: "" }); // 클릭한 좌표 추가
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    setTitle(id, e.target.value);
  };

  useEffect(() => {
    inputRef?.current?.focus();
  }, [points]);

  return (
    <div className="graph-container" onClick={handleClick}>
      {points.map((point) => (
        <Point
          key={point.id}
          x={point.x}
          y={point.y}
          title={point.title}
          onChange={(e) => handleChange(e, point.id)}
          ref={inputRef}
        />
      ))}
      <hr className="graph-devider" />
    </div>
  );
};

export default Graph;
