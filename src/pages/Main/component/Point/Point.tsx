import { ChangeEvent, forwardRef, MouseEvent } from "react";
import "./point.scss";

interface PointProp {
  id: number;
  x: number;
  y: number;
  title: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onDelete?: (id: number) => void;
}
const Point = forwardRef<HTMLInputElement, PointProp>(({ id, x, y, title, onChange, onDelete }: PointProp, ref) => {
  const handleDelete = (e: MouseEvent) => {
    if (onDelete) {
      e.stopPropagation();
      onDelete(id);
    }
  };
  return (
    <div
      className="point"
      style={{
        top: `${y - 10}px`,
        left: `${x - 10}px`,
      }}
    >
      <input
        className={`point-input ${title.length > 10 ? "long" : title.length > 5 ? "mid" : ""}`}
        type="text"
        value={title}
        ref={ref}
        onChange={onChange}
        onClick={(e) => e.stopPropagation()}
        readOnly={!onChange && true}
        placeholder="타이틀을 입력하세요"
      />
      {onDelete && (
        <button type="button" onClick={handleDelete}>
          X
        </button>
      )}
    </div>
  );
});

export default Point;
