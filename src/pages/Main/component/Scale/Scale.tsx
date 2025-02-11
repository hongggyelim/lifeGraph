import { useEffect, useState } from "react";
import { InfoType } from "../../../../types/userInfoType";
import "./scale.scss";

// { scale = 5, mode = "age" }: { scale: number; mode: "age" | "year" }
const Scale = () => {
  const [info, setInfo] = useState<InfoType>({
    name: "유저",
    birthYear: 1990,
  });
  const { birthYear } = info;

  let mode = "year";
  let scale = 5;

  // 페이지 로드 시 로컬 데이터 가져오기
  useEffect(() => {
    const storedInfo = window.localStorage.getItem("info");
    if (storedInfo) {
      setInfo(JSON.parse(storedInfo));
    }
  }, []);

  // x축
  const currentYear = new Date().getFullYear();
  const yearDiff = Math.round((currentYear - birthYear) / scale);
  const xAxis = [];
  for (let i = 0; i <= yearDiff; i++) {
    if (mode === "age") xAxis.push(scale * i);
    else if (mode === "year") xAxis.push(birthYear + scale * i);
  }

  return (
    <>
      {xAxis.map((value, index) => {
        return (
          <span className="x-unit" key={index}>
            {value}
          </span>
        );
      })}
    </>
  );
};

export default Scale;
