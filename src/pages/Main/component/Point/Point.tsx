import { ChangeEvent, forwardRef } from "react";
import "./point.scss";

interface PointProp {
  x: number;
  y: number;
  title: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const Point = forwardRef<HTMLInputElement, PointProp>(({ x, y, title, onChange }: PointProp, ref) => {
  return (
    <div
      className="point"
      style={{
        top: `${y}px`,
        left: `${x}px`,
      }}
    >
      🩷
      <input
        className="point-input"
        type="text"
        value={title}
        ref={ref}
        onChange={onChange}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
});

export default Point;
