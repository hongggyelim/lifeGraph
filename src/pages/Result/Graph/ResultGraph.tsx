import { useEffect, useState } from "react";
import Point from "../../Main/component/Point/Point";
import Path from "./Path";
import GraphContainer from "../../../components/Graph/GraphContainer";
import useMovePointByWidth from "../../../hooks/useMovePointByWidth";

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
        <Point id={point.id} x={point.x} y={point.y} title={point.title} />
      ))}
    </GraphContainer>
  );
};

export default ResultGraph;
