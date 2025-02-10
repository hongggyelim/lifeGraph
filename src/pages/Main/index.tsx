import { useEffect, useState } from "react";
import { InfoType } from "../../types/userInfoType";
import "./main.scss";
import Graph from "./component/Graph/Graph";

const MainPage = () => {
  const [info, setInfo] = useState<InfoType>({
    name: "유저",
    birthYear: 1990,
  });
  const { name, birthYear } = info;

  // 페이지 로드 시 로컬 데이터 가져오기
  useEffect(() => {
    const storedInfo = window.localStorage.getItem("info");
    if (storedInfo) {
      setInfo(JSON.parse(storedInfo));
    }
  }, []);

  return (
    <main>
      <div className="main-div">
        <h3>{name}님의 인생 그래프 그리기</h3>
        <div className="border">
          <p>
            <span>{name}님이 가장 행복했던 기억은 언제인가요?</span>
            <span>기억에 남는 순간을 점수로 기록해보세요</span>
          </p>
          <Graph />
        </div>
      </div>
    </main>
  );
};

export default MainPage;
