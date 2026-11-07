import { useMemo, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./result.scss";
import ResultGraph from "./graph/result-graph";
import saveAs from "file-saver";
import useInfo from "../../hooks/useInfo";
import { useGraphStore } from "../../store/use-graph-store";
import { getResultType } from "../../util/result-type";

const ResultPage = () => {
  const navigate = useNavigate();
  const points = useGraphStore((state) => state.points);
  const { name } = useInfo();
  const imageRef = useRef<HTMLDivElement>(null);

  const resultType = useMemo(() => getResultType(points), [points]);

  // 버튼을 누른 시점의 화면을 캡처
  const createImage = async (): Promise<Blob> => {
    if (!imageRef.current) throw new Error("캡처할 영역이 없습니다.");
    // 용량이 큰 라이브러리라 필요할 때만 불러온다
    const { default: html2canvas } = await import("html2canvas");
    const canvas = await html2canvas(imageRef.current, { scale: 2 });
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) =>
          blob ? resolve(blob) : reject(new Error("이미지 생성 실패")),
        "image/png"
      );
    });
  };

  const handleSaveImage = async () => {
    try {
      saveAs(await createImage(), "life-graph.png");
    } catch (err) {
      console.error("이미지 저장 실패:", err);
      alert("이미지 파일이 생성되지 않았습니다.");
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      // Safari 호환: 사용자 제스처 안에서 Promise를 담은 ClipboardItem을 바로 생성
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": createImage() }),
      ]);
      alert("이미지가 클립보드에 저장되었습니다.");
    } catch (err) {
      console.error("클립보드 복사 실패:", err);
      alert("클립보드 복사에 실패했습니다.");
    }
  };

  if (points.length < 2) return <Navigate to="/main" replace />;

  return (
    <main>
      <div className="result-div" ref={imageRef}>
        <h1 id="title">인생 그래프</h1>
        <div className="result-border">
          <b className="result-title">
            {name}님의 인생은 {resultType}
          </b>
          <ResultGraph />
          <div id="result-button-wrapper">
            <button
              type="button"
              id="back-button"
              onClick={() => navigate("/main")}
              data-html2canvas-ignore
            >
              Back
            </button>
            <div>
              <button
                type="button"
                onClick={handleSaveImage}
                data-html2canvas-ignore
              >
                이미지 저장하기
              </button>
              <button
                type="button"
                id="copy-button"
                onClick={handleCopyToClipboard}
                data-html2canvas-ignore
              >
                클립보드에 복사
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResultPage;
