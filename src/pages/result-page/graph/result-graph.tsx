import { useEffect, useState } from "react";
import Point from "../../main-page/component/point/point-pin";
import GraphContainer from "../../../components/graph-component/graph-container";
import useMovePointByWidth from "../../../hooks/use-move-point-by-width";
import PathLine from "./path-line";

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
      <PathLine sortedData={data} />
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
