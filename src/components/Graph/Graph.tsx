import { ChangeEvent, MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from "react";
import Point from "../../pages/Main/component/Point/Point";
import { useGraphStore } from "../../store/useGraphStore";
import GraphContainer from "./GraphContainer";
import { PointData } from "../../types/pointType";
import useMovePointByWidth from "../../hooks/useMovePointByWidth";

const Graph = () => {
  const [index, setIndex] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { addPoint, setTitle, deletePoint } = useGraphStore();

  const { points } = useMovePointByWidth();
  const handleClickPoint = (e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newId = index + 1;
    setIndex(newId); // id 순차적으로 증가
    const newPoint: PointData = { id: index, x, y, title: "📍" };
    addPoint(newPoint); // 클릭한 좌표 추가
  };
  const handleFocus = (index: number) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index]?.focus();
      console.log("index", index);
    }
  };

  // 특정 input을 클릭하면 해당 필드에 포커스
  const handleInputClick = (index: number) => {
    handleFocus(index);
  };

  // 생성된 점에 focus
  useEffect(() => {
    if (points.length > 0) {
      handleFocus(points.length - 1);
    }
    console.log("points.length", points.length);
  }, [points]);

  // 텍스트 입력시
  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    setTitle(id, e.target.value);
  };

  // point 삭제 버튼
  const handleDeletePoint = (id: number) => {
    deletePoint(id);
  };
  return (
    <GraphContainer onClick={handleClickPoint}>
      {points.map((point) => (
        <Point
          key={point.id}
          id={point.id}
          x={point.x}
          y={point.y}
          title={point.title} // input.value로 전달하는 값
          onChange={(e) => handleChangeTitle(e, point.id)}
          onDelete={handleDeletePoint}
          onClick={handleInputClick}
          ref={(el) => {
            // 각 포인트에 개별적인 ref 할당
            inputRefs.current[point.id] = el;
          }}
        />
      ))}
    </GraphContainer>
  );
};

export default Graph;
