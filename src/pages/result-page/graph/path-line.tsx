import { generatePath } from "../../../util/generate-path";
import { PointData } from "../../../types/point.type";

// viewBox를 0~100으로 두고 비율 좌표를 그대로 사용 (선 두께는 고정)
const PathLine = ({ sortedPoints }: { sortedPoints: PointData[] }) => {
  const pathData = generatePath(
    sortedPoints.map(({ x, y }) => ({ x: x * 100, y: y * 100 }))
  );

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0 }}
    >
      <path
        d={pathData}
        fill="transparent"
        stroke="black"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

export default PathLine;
