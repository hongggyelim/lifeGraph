import { ChangeEvent, FormEvent, useRef, useState } from "react";
import InfoInput from "./component/InfoInput";
import "./home.scss";
import { InfoType } from "../../types/userInfoType";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState<InfoType>({
    name: "",
    birthYear: 1990,
  });

  const nameRef = useRef<HTMLInputElement>(null);
  const birthYearRef = useRef<HTMLInputElement>(null);

  const handleChangeInfo = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: name === "name" ? value : Number(value),
    }));
  };

  //엔터 시 다음 필드로 이동 & 제출
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (e.currentTarget.name === "name") {
        e.preventDefault();
        if (!info.name) {
          alert("이름을 입력해주세요");
        } else {
          birthYearRef.current?.focus();
        }
      }
    }
  };

  const handleSubmitInfo = (e: FormEvent) => {
    if (!info.name) {
      alert("이름을 입력해주세요");
      e.preventDefault();
    } else if (!info.birthYear || info.birthYear < 1900) {
      alert("태어난 년도를 입력해주세요");
      e.preventDefault();
    } else if (info.name && info.birthYear) {
      // 제출 시 정보를 로컬스토리지에 저장
      window.localStorage.setItem("info", JSON.stringify(info));
      // 다음 스텝으로 넘어가기
      navigate("/main");
    }
  };

  return (
    <main>
      <div className="home-div">
        <h3>당신의 인생을 그려보세요</h3>
        <form className="border" onSubmit={handleSubmitInfo}>
          <div>
            <InfoInput
              type="text"
              name="name"
              onChange={handleChangeInfo}
              onKeyDowm={handleKeyDown}
              value={info.name}
              ref={nameRef}
            />
            <InfoInput
              type="number"
              name="birthYear"
              onChange={handleChangeInfo}
              onKeyDowm={handleKeyDown}
              value={info.birthYear}
              ref={birthYearRef}
            />
          </div>
          <span>* 입력된 정보는 결과 페이지에서만 사용되며 서버에 저장되지 않습니다</span>
          <button type="submit">시작하기</button>
        </form>
      </div>
    </main>
  );
};

export default Home;
