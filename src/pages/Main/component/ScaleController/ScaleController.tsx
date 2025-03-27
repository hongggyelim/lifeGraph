import { ChangeEvent } from "react";
import { useScaleStore } from "../../../../store/useScaleStore";
import { useGraphStore } from "../../../../store/useGraphStore";
import "./scaleController.scss";

const ScaleController = () => {
  // scale 기준 선택
  const { toggleMode, setScale, scale, mode } = useScaleStore();
  const { resetPoints, points } = useGraphStore();
  const handleChangeMode = (e: ChangeEvent) => {
    e.stopPropagation();
    toggleMode();
  };

  const handleChangeScale = (e: ChangeEvent<HTMLInputElement>) => {
    if (scale !== Number(e.target.value) && points.length > 0) {
      const resetConfirm = window.confirm(
        "간격을 수정하면 지금까지 작성한 내용이 리셋됩니다. 계속 하시겠습니까?"
      );
      if (resetConfirm) {
        resetPoints();
        setScale(Number(e.target.value));
      }
    } else {
      setScale(Number(e.target.value));
      console.log("else");
    }
  };
  return (
    <div className="controller-wrapper">
      <div className="controller" id="mode-control">
        기준
        <label htmlFor="age">
          <input
            className="control"
            type="checkbox"
            value="age"
            id="age"
            name="age"
            checked={mode === "age"}
            onChange={handleChangeMode}
          />
          나이
        </label>
        <label htmlFor="year">
          <input
            type="checkbox"
            className="control"
            value="year"
            id="year"
            name="year"
            checked={mode === "year"}
            onChange={handleChangeMode}
          />
          연도
        </label>
      </div>
      <div className="controller" id="scale-control">
        <label>간격</label>
        <input
          className="control"
          min={2}
          max={10}
          step={1}
          type="range"
          value={scale}
          onChange={handleChangeScale}
        />
        {scale}
      </div>
    </div>
  );
};

export default ScaleController;
