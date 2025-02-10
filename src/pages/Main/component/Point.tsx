import { ChangeEvent, useEffect, useRef } from "react";

const Point = ({
  x,
  y,
  title,
  onChange,
}: {
  x: number;
  y: number;
  title: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <div
      style={{
        position: "absolute",
        width: "4px",
        height: "4px",
        color: "blue",
        top: `${y}px`,
        left: `${x}px`,
        borderRadius: "50%",
      }}
    >
      <input type="text" value={title} ref={inputRef} onChange={onChange} />
    </div>
  );
};

export default Point;
