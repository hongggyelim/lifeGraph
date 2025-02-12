import { useEffect, useState } from "react";
import { useGraphStore } from "../store/useGraphStore";
import { PointData } from "../types/pointType";
import debounce from "../util/debounce";

const useMovePointByWidth = () => {
  // debounce 추가하기
  const [width, setWidth] = useState(window.innerWidth);
  const [prevWidth, setPrevWidth] = useState(window.innerWidth);
  const { points, setPoints } = useGraphStore();

  // 윈도우 리사이즈 감지
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    const debounceResize = debounce(handleResize, 200);

    window.addEventListener("resize", debounceResize);

    return () => {
      window.removeEventListener("resize", debounceResize);
    };
  }, []);

  useEffect(() => {
    // 이미 저장된 points x좌표 조정
    if (width !== prevWidth) {
      const newPoints: PointData[] = points.map((point) => ({ ...point, x: point.x * (width / prevWidth) }));
      setPoints(newPoints);
    }
    setPrevWidth(width);
  }, [width, points]);

  return { width, points };
};

export default useMovePointByWidth;
