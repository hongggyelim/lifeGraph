import { useEffect, useState } from "react";
import { InfoType } from "../types/userInfoType";
import { useScaleStore } from "../store/useScaleStore";

const useInfo = () => {
  const [info, setInfo] = useState<InfoType>({
    name: "유저",
    birthYear: 1990,
  });
  const { name, birthYear } = info;
  const { scale, mode } = useScaleStore();

  // 페이지 로드 시 로컬 데이터 가져오기
  useEffect(() => {
    const storedInfo = window.localStorage.getItem("info");
    if (storedInfo) {
      setInfo(JSON.parse(storedInfo));
    }
  }, []);

  // x축
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear + 1;
  const yearDiff = Math.round(age / scale);

  const xAxis = [];
  for (let i = 0; i <= yearDiff; i++) {
    switch (mode) {
      case "age":
        if (scale * i <= age) xAxis.push(scale * i);

        break;
      case "year":
        if (birthYear + scale * i <= currentYear) xAxis.push(birthYear + scale * i);
        break;
    }
  }
  switch (mode) {
    case "age":
      if (xAxis.at(-1) !== age) xAxis.push(`${age}➡️`);
      xAxis.push("🏋️");
      break;
    case "year":
      if (xAxis.at(-1) !== currentYear) xAxis.push(`${currentYear}➡️`);
      xAxis.push("🏋️");

      break;
  }

  return {
    name,
    birthYear,
    yearDiff,
    xAxis,
  };
};

export default useInfo;
