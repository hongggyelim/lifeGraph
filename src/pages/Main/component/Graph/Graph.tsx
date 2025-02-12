import { ChangeEvent, MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from "react";
import Point from "../Point/Point";
import { useGraphStore } from "../../../../store/useGraphStore";
import GraphContainer from "./GraphContainer";
// import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
// import { MouseDownEvent } from "emoji-picker-react/dist/config/config";

const Graph = () => {
  const [index, setIndex] = useState(0);
  // const [activePointId, setActivePointId] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { points, addPoint, setTitle, deletePoint } = useGraphStore();

  const handleClickPoint = (e: ReactMouseEvent<HTMLDivElement>) => {
    // @Todo 나중에 state로 바꿔서 반응형 구현하기
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newId = index + 1;
    setIndex(newId); // id 순차적으로 증가
    addPoint({ id: index, x, y, title: "📍" }); // 클릭한 좌표 추가
    // setActivePointId(newId); // 추가한 점을 active로 설정, picker 열기
  };

  // 생성된 점에 focus
  useEffect(() => {
    inputRef?.current?.focus();
  }, [points]);

  // 텍스트 입력시
  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    setTitle(id, e.target.value);
    // setActivePointId(0);
  };

  // // 이모지 선택시
  // const handleClickEmoji: MouseDownEvent = (emoji: EmojiClickData, e: MouseEvent) => {
  //   if (activePointId) {
  //     setTitle(activePointId, emoji.emoji);
  //     setActivePointId(0);
  //   }
  // };

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
          ref={inputRef}
        />
      ))}
      {/* {activePointId && (
        <div ref={pickerRef}>
          <EmojiPicker
            open={true}
            onEmojiClick={handleClickEmoji}
            style={{
              position: "absolute",
              top: `${points.find((p) => p.id === activePointId)?.y}px`,
              left: `${points.find((p) => p.id === activePointId)?.x}px`,
            }}
          />
        </div>
      )} */}
    </GraphContainer>
  );
};

export default Graph;
