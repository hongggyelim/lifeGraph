import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import InfoInput from "./component/InfoInput";
import "./home.scss";
import { InfoType } from "../../types/user-info.type";
import { useNavigate } from "react-router-dom";
import { validateInput } from "../../util/validate-input";

const Home = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState<InfoType>({
    name: "",
    birthYear: undefined,
  });

  const nameRef = useRef<HTMLInputElement>(null);
  const birthYearRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState({
    name: "",
    birthYear: "",
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
    const { name: fieldName, value } = e.target;
    setErrors((prev) => ({
      ...prev,
      [fieldName]: "",
    }));

    const parsedValue = () => {
      if (fieldName === "name") {
        return value === "" ? undefined : value;
      }

      if (value === "") return undefined;

      const num = Number(value);
      return Number.isNaN(num) ? undefined : num;
    };

    setInfo((prev) => ({
      ...prev,
      [fieldName]: parsedValue(),
    }));
  };

  const handleSubmitInfo = (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validateInput(info);

    setErrors((prev) => ({
      ...prev,
      name: validationErrors.name,
      birthYear: validationErrors.birth,
    }));
    if (validationErrors.name || validationErrors.birth) return;

    localStorage.setItem("info", JSON.stringify(info));
    navigate("/main");
  };
  const isFilled =
    info.name.trim() !== "" && typeof info.birthYear === "number";
  console.log("에러", errors);
  console.log("입력값", info);
  return (
    <main className="home-main">
      <div className="home-div">
        <h1 id="title">인생 그래프</h1>
        <p id="subtitle">당신의 인생을 그려보세요</p>
        <form action="/main" className="border" onSubmit={handleSubmitInfo}>
          <div>
            <InfoInput
              type="text"
              name="name"
              onChange={handleChangeInfo}
              value={info.name}
              ref={nameRef}
              error={errors.name}
            />
            <InfoInput
              type="number"
              name="birthYear"
              onChange={handleChangeInfo}
              value={info.birthYear ?? ""}
              ref={birthYearRef}
              error={errors.birthYear}
            />
            <button type="submit" disabled={!isFilled}>
              시작하기
            </button>
          </div>
        </form>
      </div>
      <span>
        입력된 정보는 결과 페이지에서만 사용되며 서버에 저장되지 않습니다
      </span>
    </main>
  );
};

export default Home;
