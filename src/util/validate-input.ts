import { InfoType } from "../types/user-info.type";

export const validateInput = (info: InfoType) => {
  const errors: { name: string; birth: string } = { name: "", birth: "" };

  if (!info.name) {
    errors.name = "이름을 입력해주세요";
  }

  if (!info.birthYear || info.birthYear < 1900 || info.birthYear > 2024) {
    errors.birth = "태어난 년도를 입력해주세요 (예: 1990)";
  } else if (String(info.birthYear).length !== 4) {
    errors.birth = "태어난 년도는 4자리 숫자여야 합니다";
  }

  return errors;
};
