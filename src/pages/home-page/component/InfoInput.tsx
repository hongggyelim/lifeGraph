import { ChangeEvent, InputHTMLAttributes } from "react";

interface Props {
  type: "text" | "number";
  name: "name" | "birthYear";
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const FIELD_TEXT = {
  name: { label: "이름", placeholder: "닉네임 또는 별명" },
  birthYear: { label: "태어난 년도", placeholder: "네 자리 수를 입력해주세요 (YYYY)" },
};

const InfoInput = ({ type, name, value, onChange, error }: Props) => {
  const { label, placeholder } = FIELD_TEXT[name];
  const extraProps: InputHTMLAttributes<HTMLInputElement> =
    type === "number" ? { inputMode: "numeric" } : {};
  const errorId = `${name}-error`;

  return (
    <label htmlFor={name}>
      {label}
      <input
        id={name}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={errorId}
        {...extraProps}
      />
      <p className="error" id={errorId}>
        {error}
      </p>
    </label>
  );
};

export default InfoInput;
