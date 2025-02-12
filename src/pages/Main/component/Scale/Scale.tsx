import "./scale.scss";
import useInfo from "../../../../hooks/useInfo";

// x축 눈금
const Scale = () => {
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

export default Scale;
