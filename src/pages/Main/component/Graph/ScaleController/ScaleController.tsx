import { ChangeEvent } from "react";
import { useScaleStore } from "../../../../../store/useScaleStore";
import "./scaleController.scss";

const ScaleController = () => {
  // scale 기준 선택
  const { mode, scale, toggleMode, setScale } = useScaleStore();

  const handleChangeMode = (e: ChangeEvent) => {
    e.stopPropagation();
    toggleMode();
  };
  return (
    <select className="scale-controller" onChange={handleChangeMode}>
      <option value="age">나이</option>
      <option value="year">년도</option>
    </select>
  );
};

export default ScaleController;
