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

  const getImage = async (): Promise<Blob | null> => {
    const image = imageRef.current;
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
      console.log(`이미지 생성성 중 에러 발생`, err);
      return null;
    }
  };

  const handleSaveImage = async () => {
    const blob = await getImage();
    if (blob) saveAs(blob, "life-graph.png");
  };

  const handleCopyToClipboard = async () => {
    const blob = await getImage();
    if (!blob) return;

    const clipboardItem = new ClipboardItem({
      "image/png": new Promise((resolve) => resolve(blob)),
    });

    try {
      await navigator.clipboard.write([clipboardItem]);
      alert("이미지가 클립보드에 저장되었습니다.");
    } catch (err) {
      console.error("클립보드 복사 실패:", err);
      alert("클립보드 복사에 실패했습니다.");
    }
  };
  const handleOpenImageForCopy = async () => {
    const blob = await getImage();
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const newWindow = window.open(url, "_blank");

    if (!newWindow) {
      alert("팝업 차단이 활성화되어 있어 새 창을 열 수 없습니다.");
      return;
    }

    return () => URL.revokeObjectURL(url);
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
              <button type="button" onClick={handleSaveImage} data-html2canvas-ignore>
                🖼️ 이미지로 저장
              </button>
              <button type="button" id="copy-button" onClick={handleCopyToClipboard} data-html2canvas-ignore>
                📋 이미지로 복사
              </button>
              <button type="button" onClick={handleOpenImageForCopy} data-html2canvas-ignore>
                🪟 이미지 새창에서 열기
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResultPage;
