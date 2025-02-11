import { MouseEvent } from "react";
import Scale from "../Scale/Scale";
import "../Scale/scale.scss";
import "./graphContainer.scss";

const GraphContainer = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}) => {
  return (
    <div className="graph-container" onClick={onClick}>
      {children}
      <div className="graph-devider">
        <Scale />
      </div>
    </div>
  );
};

export default GraphContainer;
