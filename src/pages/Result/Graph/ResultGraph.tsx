import { useEffect, useState } from "react";
import { useGraphStore } from "../../../store/useGraphStore";
import Point from "../../Main/component/Point/Point";
import Path from "./Path";
import GraphContainer from "../../Main/component/Graph/GraphContainer";

const ResultGraph = () => {
  const { points } = useGraphStore();
  const [data, setData] = useState(points);

  //x 좌표 기준으로 정렬
  useEffect(() => {
    const sorted = [...points].sort((a, b) => a.x - b.x);
    setData(sorted);
  }, []);

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
