import { MouseEvent } from "react";
import "./graphContainer.scss";
import Scale from "../../pages/Main/component/Scale/Scale";

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
