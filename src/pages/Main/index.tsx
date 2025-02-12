import { useEffect, useState } from "react";
import { InfoType } from "../../types/userInfoType";
import "./main.scss";
import Graph from "./component/Graph/Graph";
import { useGraphStore } from "../../store/useGraphStore";
import { useNavigate } from "react-router-dom";
import ScaleController from "./component/Graph/ScaleController/ScaleController";

const MainPage = () => {
  const [info, setInfo] = useState<InfoType>({
    name: "유저",
    birthYear: 1990,
  });
  const { name } = info;
  const { points, resetPoints } = useGraphStore();
  const navigate = useNavigate();

  // 페이지 로드 시 로컬 데이터 가져오기
  useEffect(() => {
    const storedInfo = window.localStorage.getItem("info");
    if (storedInfo) {
      setInfo(JSON.parse(storedInfo));
    }
  }, []);

  const handleClickReset = () => {
    const deleteConfirm = window.confirm("지금까지 입력한 데이터를 삭제하시겠습니까?");
    if (deleteConfirm) resetPoints();
  };

  const handleClickGetResult = () => {
    if (points.length < 2) {
      alert("두 개 이상 데이터를 입력해주세요");
    } else {
      navigate("/result");
    }
  };

  return (
    <main>
      <div className="main-div">
        <h3>{name}님의 인생 그래프 그리기</h3>
        <div className="border">
          <span className="description">
            <p>{name}님이 가장 행복했던 기억은 언제인가요?</p>
            <p>기억에 남는 순간을 점수로 기록해보세요</p>
          </span>
          <ScaleController />
          {points.length === 0 && <p id="guide">그래프를 그리고 싶은 위치에 클릭하세요</p>}
          <Graph />
          <div id="button-wrapper">
            <button type="button" id="reset-button" onClick={handleClickReset}>
              reset
            </button>
            <button type="button" onClick={handleClickGetResult}>
              그래프 생성하기
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainPage;
