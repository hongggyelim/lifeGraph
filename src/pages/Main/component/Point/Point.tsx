import { ChangeEvent, forwardRef, MouseEvent } from "react";
import "./point.scss";

interface PointProp {
  id: number;
  x: number;
  y: number;
  title: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onDelete?: (id: number) => void;
  onClick?: (index: number) => void;
}
const Point = forwardRef<HTMLInputElement, PointProp>(
  ({ id, x, y, title, onChange, onDelete, onClick }: PointProp, ref) => {
    const handleDelete = (e: MouseEvent) => {
      if (onDelete) {
        e.stopPropagation();
        onDelete(id);
      }
    };

    const handleClickInput = (e: MouseEvent) => {
      e.stopPropagation();
      if (onClick) onClick(id);
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
          className={`point-input ${title.length > 7 ? "long" : ""}`}
          type="text"
          value={title}
          ref={ref}
          onChange={onChange}
          onClick={(e) => handleClickInput(e)}
          readOnly={!onChange && true}
        />
        {onDelete && (
          <button type="button" onClick={handleDelete}>
            X
          </button>
        )}
      </div>
    );
  }
);

export default Point;
