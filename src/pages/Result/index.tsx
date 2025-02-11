import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InfoType } from "../../types/userInfoType";
import "./result.scss";
import ResultGraph from "./Graph/ResultGraph";
import html2canvas from "html2canvas";
import saveAs from "file-saver";

const ResultPage = () => {
  const [info, setInfo] = useState<InfoType>({
    name: "유저",
    birthYear: 1990,
  });
  const { name } = info;
  const navigate = useNavigate();

  // 페이지 로드 시 로컬 데이터 가져오기
  useEffect(() => {
    const storedInfo = window.localStorage.getItem("info");
    if (storedInfo) {
      setInfo(JSON.parse(storedInfo));
    }
  }, []);

  const type = {
    1: "승승장구😎",
    2: "진취적인 개혁가😎",
    3: "멋진 인생😎",
    4: "대기만성, 화이팅!📣",
    5: "비온뒤 맑음🌤️",
    6: "조화로운 삶🌸",
    7: "안정적인 성장📈",
    8: "다채로운 삶🎨",
  };

  const imageRef = useRef<HTMLDivElement>(null);

  const handleImageAction = async (action: "copy" | "save") => {
    const image = imageRef.current;
    if (!image) return;

    try {
      const canvas = await html2canvas(image, { scale: 2 });
      canvas.toBlob(async (blob) => {
        if (!blob) return;

        if (action === "copy") {
          //클립보드 복사
          await navigator.clipboard.write([
            new ClipboardItem({
              "image/png": blob,
            }),
          ]);
          alert("이미지가 클립보드에 저장되었습니다.");
        } else if (action === "save") {
          // 이미지 다운로드
          saveAs(blob, "life-graph.png");
        }
      });
    } catch (err) {
      console.log(`이미지 ${action === "copy" ? "클립보드 복사" : "다운로드"} 중 에러 발생`, err);
    }
  };
  return (
    <main>
      <div className="main-div">
        <h3>{name}님의 인생 그래프</h3>
        <div className="border" ref={imageRef}>
          <b className="result-title">
            {name}님의 인생은 {type[1]}
          </b>
          <ResultGraph />
          <div id="result-button-wrapper">
            <button type="button" onClick={() => navigate("/main")} data-html2canvas-ignore>
              👈 다시 그리러 가기
            </button>
            <div>
              <button type="button" onClick={() => handleImageAction("save")} data-html2canvas-ignore>
                🖼️ 저장
              </button>
              <button type="button" onClick={() => handleImageAction("copy")} data-html2canvas-ignore>
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
