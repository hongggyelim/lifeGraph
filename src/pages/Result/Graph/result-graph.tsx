import { useEffect, useState } from "react";
import Point from "../../main/component/point/point";
import Path from "./path";
import GraphContainer from "../../../components/graph/graph-container";
import useMovePointByWidth from "../../../hooks/use-move-point-by-width";

const ResultGraph = () => {
  const { points } = useMovePointByWidth();

  const [data, setData] = useState(points);

  //x 좌표 기준으로 정렬
  useEffect(() => {
    const sorted = [...points].sort((a, b) => a.x - b.x);
    setData(sorted);
  }, [points]);

  return (
    <GraphContainer>
      <Path sortedData={data} />
      {points.map((point) => (
        <Point
          key={point.id}
          id={point.id}
          x={point.x}
          y={point.y}
          title={point.title}
        />
      ))}
    </GraphContainer>
  );
};

export default ResultGraph;
