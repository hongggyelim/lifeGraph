import { ChangeEvent } from "react";
import { useScaleStore } from "../../../../store/useScaleStore";
import "./scaleController.scss";

const ScaleController = () => {
  // scale 기준 선택
  const { toggleMode, setScale, scale, mode } = useScaleStore();
  const handleChangeMode = (e: ChangeEvent) => {
    e.stopPropagation();
    toggleMode();
  };

  const handleChangeScale = (e: ChangeEvent<HTMLInputElement>) => {
    setScale(Number(e.target.value));
  };
  return (
    <div className="controller-wrapper">
      <div className="controller" id="mode-control">
        기준
        <label htmlFor="age">
          <input type="checkbox" value="age" id="age" name="age" checked={mode === "age"} onChange={handleChangeMode} />
          나이
        </label>
        <label htmlFor="year">
          <input
            type="checkbox"
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
        <input min={2} max={10} step={1} type="range" value={scale} onChange={handleChangeScale} />
        {scale}
      </div>
    </div>
  );
};

export default ScaleController;
