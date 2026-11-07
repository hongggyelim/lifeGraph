import { MouseEvent } from "react";
import classNames from "classnames";
import "./point.scss";

export const MAX_TITLE_LENGTH = 12;

interface PointProp {
  id: number;
  x: number;
  y: number;
  title: string;
  onChange?: (title: string) => void;
  onDelete?: (id: number) => void;
}

const stopPropagation = (e: MouseEvent) => e.stopPropagation();

const Point = ({ id, x, y, title, onChange, onDelete }: PointProp) => {
  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation();
    onDelete?.(id);
  };

  return (
    <div
      className="point"
      style={{
        top: `calc(${y * 100}% - 10px)`,
        left: `calc(${x * 100}% - 10px)`,
      }}
    >
      <input
        className={classNames("point-input", title.length > 7 && "long")}
        type="text"
        value={title}
        maxLength={MAX_TITLE_LENGTH}
        aria-label="포인트 내용"
        onChange={(e) => onChange?.(e.target.value)}
        onClick={stopPropagation}
        readOnly={!onChange}
      />
      {onDelete && (
        <button type="button" aria-label="포인트 삭제" onClick={handleDelete}>
          X
        </button>
      )}
    </div>
  );
};

export default Point;
