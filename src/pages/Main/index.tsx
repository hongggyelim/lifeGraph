import "./main.scss";
import Graph from "../../components/Graph/Graph";
import { useGraphStore } from "../../store/useGraphStore";
import { useNavigate } from "react-router-dom";
import ScaleController from "./component/ScaleController/ScaleController";
import useInfo from "../../hooks/useInfo";
import { BsExclamationCircle } from "react-icons/bs";

const MainPage = () => {
  const navigate = useNavigate();

  const { points, resetPoints } = useGraphStore();
  const { name } = useInfo();
  const handleClickBack = () => {
    if (points.length >= 1) {
      let confirm = window.confirm(
        "지금까지 입력한 데이터를 초기화하고 이전 페이지로 이동하시겠습니까?"
      );
      if (confirm) navigate("/");
    }
    navigate("/");
    resetPoints();
  };

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
        <h1 id="title">인생 그래프</h1>
        <p id="subtitle">{name}님,기억에 남는 순간을 기록해보세요</p>
        <ul className="description">
          <b className="tip">
            <BsExclamationCircle />
            Tip !
          </b>
          <li>핀📍을 선택해 텍스트를 수정하거나 삭제할 수 있어요</li>
          <li>🖥️ 넓은 화면을 권장합니다</li>
          <li>그래프 생성하기를 누르고 이미지를 공유해보세요</li>
        </ul>
        <ScaleController />
        <div className="main-border">
          {points.length === 0 && (
            <p id="guide">그래프를 그리고 싶은 위치에 클릭하세요</p>
          )}
          <Graph />
          <div id="button-wrapper">
            <div className="flex-row">
              <button
                type="button"
                className={`button`}
                onClick={handleClickBack}
                // disabled={!points.length}
              >
                Back
              </button>
              <button
                type="button"
                className={`button`}
                onClick={handleClickReset}
                disabled={!points.length}
              >
                Reset
              </button>
            </div>
            <button
              type="button"
              className={`button generate`}
              disabled={!points.length}
              onClick={handleClickGetResult}
            >
              그래프 생성하기
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainPage;
