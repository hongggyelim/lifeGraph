import { InfoType } from "../types/user-info.type";

export const MIN_BIRTH_YEAR = 1900;

export const validateInput = (
  info: InfoType,
  currentYear = new Date().getFullYear()
) => {
  const errors = { name: "", birth: "" };

  if (!info.name.trim()) {
    errors.name = "이름을 입력해주세요";
  }

  const { birthYear } = info;
  if (birthYear === undefined || !Number.isInteger(birthYear)) {
    errors.birth = "태어난 년도를 입력해주세요 (예: 1990)";
  } else if (birthYear < MIN_BIRTH_YEAR || birthYear > currentYear) {
    errors.birth = `${MIN_BIRTH_YEAR}년부터 ${currentYear}년 사이로 입력해주세요`;
  }

  return errors;
};
