import { ChangeEvent } from "react";
import { useScaleStore } from "../../../../../store/useScaleStore";
import "./scaleController.scss";

const ScaleController = () => {
  // scale 기준 선택
  const { toggleMode, setScale, scale } = useScaleStore();

  const handleChangeMode = (e: ChangeEvent) => {
    e.stopPropagation();
    toggleMode();
  };

  const handleChangeScale = (e: ChangeEvent<HTMLInputElement>) => {
    setScale(Number(e.target.value));
  };
  return (
    <div className="controller-wrapper">
      <select className="controller" onChange={handleChangeMode}>
        <option value="age">나이</option>
        <option value="year">년도</option>
      </select>
      <input type="number" value={scale} className="controller" onChange={handleChangeScale} />
    </div>
  );
};

export default ScaleController;
