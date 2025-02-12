import "./xscale.scss";
import useInfo from "../../../hooks/useInfo";

// x축 눈금
const XScale = () => {
  const { xAxis } = useInfo();

  return (
    <>
      {xAxis.map((value, index) => {
        return (
          <span className="x-unit" key={index}>
            {value}
          </span>
        );
      })}
    </>
  );
};

export default XScale;
