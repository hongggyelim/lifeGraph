import { MouseEvent } from "react";
import "./graph-container.scss";
import XScale from "./x-scale/XScale";
import useMovePointByWidth from "../../hooks/use-move-point-by-width";
import { useLocation } from "react-router-dom";

const GraphContainer = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}) => {
  const { containerRef } = useMovePointByWidth();
  // result 페이지라면 별도 스타일
  let location = useLocation();
  let pathname = location.pathname.includes("result");
  return (
    <div className={`${pathname && "result"} graph-wrapper`} ref={containerRef}>
      <div
        className={`${pathname && "result"} graph-container`}
        onClick={onClick}
      >
        {children}
      </div>
      <XScale />
    </div>
  );
};

export default GraphContainer;
