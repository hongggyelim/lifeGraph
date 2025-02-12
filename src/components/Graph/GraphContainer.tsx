import { MouseEvent } from "react";
import "./graphContainer.scss";
import XScale from "./XScale/XScale";
import YScale from "./YScale/YScale";

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
        <XScale />
      </div>
      <YScale />
    </div>
  );
};

export default GraphContainer;
