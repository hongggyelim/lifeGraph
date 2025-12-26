import "./xscale.scss";
import useInfo from "../../../hooks/useInfo";

// x축 눈금
const XScale = () => {
  const { xAxis } = useInfo();

  return (
    <div className="graph-divider">
      {xAxis.map((value, index) => {
        return (
          <span className="x-unit" key={index}>
            {value}
          </span>
        );
      })}
    </div>
  );
};

export default XScale;
