import { MouseEvent } from "react";
import { useGraphStore } from "../../store/use-graph-store";
import GraphContainer from "./graph-container";
import Point from "../../pages/main-page/component/point/point-pin";

const Graph = () => {
  const { points, addPoint, setTitle, deletePoint } = useGraphStore();

  // 클릭 위치를 그래프 영역 대비 비율(0~1)로 저장
  const handleClickGraph = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    addPoint({
      id: Date.now(),
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
      title: "📍",
    });
  };

  return (
    <GraphContainer onClick={handleClickGraph}>
      {points.map((point) => (
        <Point
          key={point.id}
          {...point}
          onChange={(title) => setTitle(point.id, title)}
          onDelete={deletePoint}
        />
      ))}
    </GraphContainer>
  );
};

export default Graph;
