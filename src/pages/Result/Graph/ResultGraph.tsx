import { useEffect, useState } from "react";
import { useGraphStore } from "../../../store/useGraphStore";
import Point from "../../Main/component/Point/Point";
import Path from "./Path";
import GraphContainer from "../../../components/Graph/GraphContainer";
import useWidth from "../../../hooks/useWidth";

const ResultGraph = () => {
  const { points, setPoints } = useGraphStore();
  const { width } = useWidth();
  const [prevWidth, setPrevWidth] = useState(width);

  const [data, setData] = useState(points);
  useEffect(() => {
    if (width !== prevWidth) {
      const newPoints = points.map((point) => ({
        ...point,
        x: (point.x * width) / prevWidth, // 비율에 맞게 조정
      }));
      setPoints(newPoints);
      setPrevWidth(width); // width 업데이트
    }
  }, [width]);
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
