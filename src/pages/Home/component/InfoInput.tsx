import { ChangeEvent, forwardRef, KeyboardEvent, Ref } from "react";

interface Props {
  type: string;
  name: string;
  value: string | number;
  ref: Ref<HTMLInputElement>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDowm: (e: KeyboardEvent<HTMLInputElement>) => void;
}
const InfoInput = forwardRef<HTMLInputElement, Props>(({ type, name, value, onChange, onKeyDowm }, ref) => {
  return (
    <>
      <label htmlFor={name}>
        {name === "birthYear" ? "태어난 년도를 입력해주세요" : "이름을 입력해주세요"}
        <input
          ref={ref}
          type={type}
          value={value}
          name={name}
          onChange={onChange}
          onKeyDown={onKeyDowm}
          placeholder={name === "birthYear" ? "네 자리 수를 입력해주세요 (YYYY)" : "닉네임 또는 별명"}
        />
      </label>
    </>
  );
});

export default InfoInput;
