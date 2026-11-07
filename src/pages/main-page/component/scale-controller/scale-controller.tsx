import { ChangeEvent } from "react";
import { useScaleStore } from "../../../../store/use-scale-store";
import { useGraphStore } from "../../../../store/use-graph-store";
import { ScaleMode } from "../../../../util/x-axis";
import "./scale-controller.scss";

const MODES: { value: ScaleMode; label: string }[] = [
  { value: "age", label: "나이" },
  { value: "year", label: "연도" },
];

const ScaleController = () => {
  const { setMode, setScale, scale, mode } = useScaleStore();
  const { resetPoints, points } = useGraphStore();

  const handleChangeScale = (e: ChangeEvent<HTMLInputElement>) => {
    const nextScale = Number(e.target.value);
    if (nextScale === scale) return;

    if (points.length > 0) {
      const resetConfirm = window.confirm(
        "간격을 수정하면 지금까지 작성한 내용이 리셋됩니다. 계속 하시겠습니까?"
      );
      if (!resetConfirm) return;
      resetPoints();
    }
    setScale(nextScale);
  };

  return (
    <div className="controller-wrapper">
      <fieldset className="controller" id="mode-control">
        <legend>기준</legend>
        {MODES.map(({ value, label }) => (
          <label key={value} htmlFor={value}>
            <input
              className="control"
              type="radio"
              id={value}
              name="mode"
              value={value}
              checked={mode === value}
              onChange={() => setMode(value)}
            />
            {label}
          </label>
        ))}
      </fieldset>
      <div className="controller" id="scale-control">
        <label htmlFor="scale">간격</label>
        <input
          className="control"
          id="scale"
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
