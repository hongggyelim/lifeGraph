import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import InfoInput from "./component/InfoInput";
import "./home.scss";
import { InfoType } from "../../types/userInfoType";
import { useNavigate } from "react-router-dom";
import { validateInput } from "../../util/validateInput";

const Home = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState<InfoType>({
    name: "",
    birthYear: 1990,
  });

  const nameRef = useRef<HTMLInputElement>(null);
  const birthYearRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState({
    name: "",
    birth: "",
  });

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isKakaoInApp = userAgent.includes("kakaotalk");

    // 카카오톡 인앱 브라우저일 경우에만 실행
    if (isKakaoInApp) {
      const targetUrl = "https://life-graph.vercel.app/";
      window.location.replace(
        `kakaotalk://web/openExternal?url=${encodeURIComponent(targetUrl)}`
      );
    }
  }, []);

  const handleChangeInfo = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: name === "name" ? value : Number(value),
    }));
  };

  //엔터 시 다음 필드로 이동 & 제출
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    handleSubmitInfo(e as unknown as FormEvent);
  };

  const handleSubmitInfo = (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validateInput(info);
    setErrors((prev) => ({
      ...prev,
      name: validationErrors.name,
      birth: validationErrors.birth,
    }));

    // 제출 시 정보를 로컬스토리지에 저장
    window.localStorage.setItem("info", JSON.stringify(info));
    // 다음 스텝으로 넘어가기
    if (!validationErrors.name && !validationErrors.birth) navigate("/main");
  };

  return (
    <main>
      <div className="home-div">
        <h1>인생 그래프</h1>
        <p>당신의 인생을 그려보세요</p>
        <form className="border" onSubmit={handleSubmitInfo}>
          <div>
            <InfoInput
              type="text"
              name="name"
              onChange={handleChangeInfo}
              onKeyDown={handleKeyDown}
              value={info.name}
              ref={nameRef}
              error={errors.name}
            />
            <InfoInput
              type="number"
              name="birthYear"
              onChange={handleChangeInfo}
              onKeyDown={handleKeyDown}
              value={info.birthYear}
              ref={birthYearRef}
              error={errors.birth}
            />
          </div>
          <span>
            * 입력된 정보는 결과 페이지에서만 사용되며 서버에 저장되지 않습니다
          </span>
          <button type="submit">시작하기</button>
        </form>
      </div>
    </main>
  );
};

export default Home;
