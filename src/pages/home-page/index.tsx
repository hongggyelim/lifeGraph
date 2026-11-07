import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import InfoInput from "./component/InfoInput";
import "./home.scss";
import { InfoType } from "../../types/user-info.type";
import { useNavigate } from "react-router-dom";
import { validateInput } from "../../util/validate-input";
import { useInfoStore } from "../../store/use-info-store";

const Home = () => {
  const navigate = useNavigate();
  const storedName = useInfoStore((state) => state.name);
  const storedBirthYear = useInfoStore((state) => state.birthYear);
  const saveInfo = useInfoStore((state) => state.setInfo);

  // 이전에 입력한 정보가 있으면 채워둔다
  const [info, setInfo] = useState<InfoType>({
    name: storedName,
    birthYear: storedBirthYear,
  });
  const [errors, setErrors] = useState({ name: "", birthYear: "" });

  useEffect(() => {
    // 카카오톡 인앱 브라우저일 경우 외부 브라우저로 열기
    if (navigator.userAgent.toLowerCase().includes("kakaotalk")) {
      window.location.replace(
        `kakaotalk://web/openExternal?url=${encodeURIComponent(window.location.href)}`
      );
    }
  }, []);

  const handleChangeInfo = (e: ChangeEvent<HTMLInputElement>) => {
    const { name: fieldName, value } = e.target;
    setErrors((prev) => ({ ...prev, [fieldName]: "" }));

    const parsedValue =
      fieldName === "name"
        ? value
        : value === "" || Number.isNaN(Number(value))
          ? undefined
          : Number(value);

    setInfo((prev) => ({ ...prev, [fieldName]: parsedValue }));
  };

  const handleSubmitInfo = (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validateInput(info);
    setErrors({ name: validationErrors.name, birthYear: validationErrors.birth });
    if (validationErrors.name || validationErrors.birth) return;

    saveInfo({ name: info.name.trim(), birthYear: info.birthYear });
    navigate("/main");
  };

  const isFilled = info.name.trim() !== "" && info.birthYear !== undefined;

  return (
    <main className="home-main">
      <div className="home-div">
        <h1 id="title">인생 그래프</h1>
        <p id="subtitle">당신의 인생을 그려보세요</p>
        <form className="border" onSubmit={handleSubmitInfo} noValidate>
          <div>
            <InfoInput
              type="text"
              name="name"
              onChange={handleChangeInfo}
              value={info.name}
              error={errors.name}
            />
            <InfoInput
              type="number"
              name="birthYear"
              onChange={handleChangeInfo}
              value={info.birthYear ?? ""}
              error={errors.birthYear}
            />
            <button type="submit" disabled={!isFilled}>
              시작하기
            </button>
          </div>
        </form>
      </div>
      <span className="notice">
        입력된 정보는 결과 페이지에서만 사용되며 서버에 저장되지 않습니다
      </span>
    </main>
  );
};

export default Home;
