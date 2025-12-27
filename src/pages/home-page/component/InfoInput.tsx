import { ChangeEvent, forwardRef, KeyboardEvent, Ref } from "react";

interface Props {
  type: string;
  name: string;
  value: string | number;
  ref: Ref<HTMLInputElement>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  error?: string;
}

const InfoInput = forwardRef<HTMLInputElement, Props>(
  ({ type, name, value, onChange, onKeyDown, error }, ref) => {
    return (
      <>
        <label htmlFor={name}>
          {name === "birthYear" ? "태어난 년도" : "이름"}
          <input
            ref={ref}
            type={type}
            value={value}
            name={name}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={
              name === "birthYear"
                ? "네 자리 수를 입력해주세요 (YYYY)"
                : "닉네임 또는 별명"
            }
          />
          <p className="error">{error}</p>
        </label>
      </>
    );
  }
);

export default InfoInput;
