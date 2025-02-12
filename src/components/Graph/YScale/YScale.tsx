import "./yscale.scss";
const YScale = () => {
  // - 100 부터 100까지
  const yAxis = [];
  for (let i = -100; i <= 100; i += 25) {
    yAxis.push(i);
  }

  return (
    <div className="y-axis">
      {yAxis.reverse().map((item, index) => {
        return (
          <span className={item === 0 ? "hidden" : "y-unit"} key={index}>
            {item}
          </span>
        );
      })}
    </div>
  );
};

export default YScale;
