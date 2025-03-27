import "./main.scss";
import Graph from "../../components/Graph/Graph";
import { useGraphStore } from "../../store/useGraphStore";
import { useNavigate } from "react-router-dom";
import ScaleController from "./component/ScaleController/ScaleController";
import useInfo from "../../hooks/useInfo";

const MainPage = () => {
  const navigate = useNavigate();

  const { points, resetPoints } = useGraphStore();
  const { name } = useInfo();

  const handleClickReset = () => {
    const deleteConfirm = window.confirm(
      "지금까지 입력한 데이터를 삭제하시겠습니까?"
    );
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
        <p>{name}님,기억에 남는 순간을 기록해보세요</p>
        <p className="description">
          <b>Tip ! </b>
          핀📍을 선택해 텍스트를 수정하거나 삭제할 수 있어요
          <br />
          🖥️ 넓은 화면을 권장합니다
        </p>
        <div className="border">
          <ScaleController />
          {points.length === 0 && (
            <p id="guide">그래프를 그리고 싶은 위치에 클릭하세요</p>
          )}
          <Graph />
          <div id="button-wrapper">
            <button
              type="button"
              className={`${points.length ? "reset" : "disabled"}`}
              onClick={handleClickReset}
              disabled={!points.length} //길이 0이면 disabled true
            >
              Reset
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
