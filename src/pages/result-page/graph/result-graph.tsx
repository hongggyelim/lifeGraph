import { useMemo } from "react";
import Point from "../../main-page/component/point/point-pin";
import GraphContainer from "../../../components/graph-component/graph-container";
import PathLine from "./path-line";
import { useGraphStore } from "../../../store/use-graph-store";

const ResultGraph = () => {
  const points = useGraphStore((state) => state.points);
  const sortedPoints = useMemo(
    () => [...points].sort((a, b) => a.x - b.x),
    [points]
  );

  return (
    <GraphContainer readOnly>
      <PathLine sortedPoints={sortedPoints} />
      {points.map((point) => (
        <Point key={point.id} {...point} />
      ))}
    </GraphContainer>
  );
};

export default ResultGraph;
