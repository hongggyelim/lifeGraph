import { MouseEvent } from "react";
import "./graphContainer.scss";
import XScale from "./XScale/XScale";
import useMovePointByWidth from "../../hooks/useMovePointByWidth";

const GraphContainer = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}) => {
  const { containerRef } = useMovePointByWidth();

  return (
    <div className="graph-wrapper" ref={containerRef}>
      <div className="graph-container" onClick={onClick}>
        {children}
      </div>
      <XScale />
    </div>
  );
};

export default GraphContainer;
