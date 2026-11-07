import { MouseEvent, ReactNode } from "react";
import classNames from "classnames";
import "./graph-container.scss";
import XScale from "./x-scale/x-scale";

interface Props {
  children: ReactNode;
  readOnly?: boolean;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

const GraphContainer = ({ children, readOnly = false, onClick }: Props) => {
  return (
    <div className={classNames("graph-wrapper", readOnly && "result")}>
      <div
        className={classNames("graph-container", readOnly && "result")}
        onClick={onClick}
      >
        {children}
      </div>
      <XScale />
    </div>
  );
};

export default GraphContainer;
