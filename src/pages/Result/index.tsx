import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./result.scss";
import ResultGraph from "./Graph/ResultGraph";
import html2canvas from "html2canvas";
import saveAs from "file-saver";
import useInfo from "../../hooks/useInfo";
import { useGraphStore } from "../../store/useGraphStore";

const ResultPage = () => {
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const navigate = useNavigate();
  const { points } = useGraphStore();
  const { name } = useInfo();
  const imageRef = useRef<HTMLDivElement>(null);

  let result = String(Math.floor(Math.random() * 8));

  const resultType = {
    1: "승승장구😎",
    2: "진취적인 개혁가😎",
    3: "멋진 인생😎",
    4: "조화로운 삶🌸",
    5: "안정적인 성장📈",
    6: "다채로운 삶🎨",
    7: "우상향 가즈아!📈",
    8: "비온뒤 맑음🌤️",
  }[result];

  const image = imageRef.current;
  const getImage = async (): Promise<Blob | null> => {
    if (!image) return null;
    try {
      const canvas = await html2canvas(image, { scale: 2 });
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            alert("이미지 파일이 생성되지 않았습니다.");
            resolve(null);
          } else {
            resolve(blob);
          }
        }, "image/png");
      });
    } catch (err) {
      console.log(`이미지 생성 중 에러 발생`, err);
      return null;
    }
  };

  useEffect(() => {
    if (image) getImage().then((blob) => setImageBlob(blob));
  }, [image]);

  const handleSaveImage = async () => {
    if (imageBlob) saveAs(imageBlob, "life-graph.png");
  };

  const handleCopyToClipboard = () => {
    if (!imageBlob) return;

    try {
      navigator.clipboard.write([
        new ClipboardItem({
          "image/png": imageBlob,
        }),
      ]);
      alert("이미지가 클립보드에 저장되었습니다.");
    } catch (err) {
      console.error("클립보드 복사 실패:", err);
      alert("클립보드 복사에 실패했습니다.");
    }
  };

  useEffect(() => {
    if (!points.length) navigate("/");
  }, []);

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
                🖼️ 그래프 저장하기
              </button>
              <button
                type="button"
                id="copy-button"
                onClick={handleCopyToClipboard}
                data-html2canvas-ignore
              >
                📋 클립보드에 복사
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResultPage;
