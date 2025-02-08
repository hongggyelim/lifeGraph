import { ChangeEvent, useState } from "react";
import InfoInput from "./component/InfoInput";
import "./home.scss";
import { InfoType } from "../../types/userInfoType";

const Home = () => {
  const [info, setInfo] = useState<InfoType>({
    name: "",
    birthYear: 1900,
  });

  const handleChangeInfo = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: name === "name" ? value : Number(value),
    }));
  };

  const handleSubmitInfo = () => {
    // 제출 시 정보를 로컬스토리지에 저장
    window.localStorage.setItem("info", JSON.stringify(info));
    // 다음 스텝으로 넘어가기
  };

  return (
    <main className="main">
      <p>당신의 인생을 그려보세요</p>
      <form id="form" onSubmit={handleSubmitInfo}>
        <InfoInput type="text" name="name" onChange={handleChangeInfo} value={info.name} />
        <InfoInput type="number" name="birthYear" onChange={handleChangeInfo} value={info.birthYear} />
        <button type="submit">시작하기</button>
      </form>
    </main>
  );
};

export default Home;
