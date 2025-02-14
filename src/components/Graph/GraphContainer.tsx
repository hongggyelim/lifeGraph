import { MouseEvent } from "react";
import "./graphContainer.scss";
import XScale from "./XScale/XScale";

const GraphContainer = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}) => {
  return (
    <div className="graph-wrapper">
      <div className="graph-container" onClick={onClick}>
        {children}
      </div>
      <XScale />
    </div>
  );
};

export default GraphContainer;
