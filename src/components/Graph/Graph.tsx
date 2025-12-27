import { ChangeEvent, MouseEvent as ReactMouseEvent, useRef } from "react";
import { useGraphStore } from "../../store/use-graph-store";
import GraphContainer from "./graph-container";
import { PointData } from "../../types/point.type";
import useMovePointByWidth from "../../hooks/use-move-point-by-width";
import { useLocation } from "react-router-dom";
import Point from "../../pages/main/component/point/point";

const Graph = () => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { addPoint, setTitle, deletePoint } = useGraphStore();

  const { points } = useMovePointByWidth();
  const handleClickPoint = (e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newPoint: PointData = { id: Date.now(), x, y, title: "📍" };
    addPoint(newPoint); // 클릭한 좌표 추가
  };
  const handleFocus = (index: number) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index]?.focus();
    }
  };

  // 특정 input을 클릭하면 해당 필드에 포커스
  const handleInputClick = (index: number) => {
    handleFocus(index);
  };

  // 텍스트 입력시
  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    const newTitle = e.target.value;
    if (newTitle.length > 12) {
      alert("10자 이내로 작성해주세요");
    } else {
      setTitle(id, newTitle);
    }
  };

  // point 삭제 버튼
  const handleDeletePoint = (id: number) => {
    deletePoint(id);
  };

  // result 페이지라면 별도 스타일
  let location = useLocation();
  let pathname = location.pathname.includes("result");
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
