import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./result.scss";
import ResultGraph from "./Graph/ResultGraph";
import html2canvas from "html2canvas";
import saveAs from "file-saver";
import useInfo from "../../hooks/useInfo";

const ResultPage = () => {
  const navigate = useNavigate();
  const { name } = useInfo();
  let result = String(Math.floor(Math.random() * 8));

  const resultType = {
    1: "승승장구😎",
    2: "진취적인 개혁가😎",
    3: "멋진 인생😎",
    4: "조화로운 삶🌸",
    5: "안정적인 성장📈",
    6: "다채로운 삶🎨",
    7: "대기만성, 화이팅!📣",
    8: "비온뒤 맑음🌤️",
  }[result];

  const imageRef = useRef<HTMLDivElement>(null);

  const getImage = async () => {
    const image = imageRef.current;
    if (!image) return;
    try {
      const canvas = await html2canvas(image, { scale: 2 });
      canvas.toBlob(async (blob) => {
        if (!blob) {
          alert("이미지 파일이 생성되지 않았습니다.");
          return;
        }
        return blob;
      });
    } catch (err) {
      console.log(`이미지 생성성 중 에러 발생`, err);
    }
  };

  const handleSaveImage = (blob: Blob) => {
    saveAs(blob, "life-graph.png");
  };

  const handleCopyImage = (blob: Blob) => {
    navigator.clipboard.write([
      new ClipboardItem({
        "image/png": blob,
      }),
    ]);
    alert("이미지가 클립보드에 저장되었습니다.");
  };

  return (
    <main>
      <div className="main-div">
        {/* <h3>{name}님의 인생 그래프</h3> */}
        <div className="border" ref={imageRef}>
          <b className="result-title">
            {name}님의 인생은 {resultType}
          </b>
          <ResultGraph />
          <div id="result-button-wrapper">
            <button type="button" onClick={() => navigate("/main")} data-html2canvas-ignore>
              👈 뒤로 가기
            </button>
            <div>
              <button type="button" onClick={() => handleSaveImage} data-html2canvas-ignore>
                🖼️ 저장
              </button>
              <button type="button" id="copy-button" onClick={() => handleCopyImage} data-html2canvas-ignore>
                📋 복사
              </button>
              {/* <button type="button" onClick={() => navigate("/main")} data-html2canvas-ignore>
                🙋‍♀️ 공유
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResultPage;
