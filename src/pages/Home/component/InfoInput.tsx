import { ChangeEvent, useRef } from "react";

interface Props {
  type: string;
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const InfoInput = ({ type, name, value, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  inputRef.current?.focus();
  return (
    <>
      <label htmlFor={name}>
        {name === "birthYear" ? "태어난 년도를 입력해주세요" : "이름을 입력해주세요"}
        <input
          ref={inputRef}
          type={type}
          value={value}
          name={name}
          onChange={onChange}
          placeholder={name === "birthYear" ? "네 자리 수를 입력해주세요 (YYYY)" : "닉네임 또는 별명"}
        />
      </label>
    </>
  );
};

export default InfoInput;
