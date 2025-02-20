import { useEffect, useRef, useState } from "react";
import { useGraphStore } from "../store/useGraphStore";
import { PointData } from "../types/pointType";
import debounce from "../util/debounce";

const useMovePointByWidth = () => {
  // debounce 추가하기
  const containerRef = useRef<HTMLDivElement | null>(null); // 기준이 될 DOM 요소

  const [width, setWidth] = useState(0);
  const [prevWidth, setPrevWidth] = useState(0);
  const { points, setPoints } = useGraphStore();

  // 특정 DOM 리사이즈 감지

  useEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.clientWidth);
      }
    };

    // 디바운스 적용
    const debouncedUpdateWidth = debounce(updateWidth, 200);

    // ResizeObserver로 감지
    const observer = new ResizeObserver(debouncedUpdateWidth);
    observer.observe(containerRef.current);

    // 초기 값 설정
    updateWidth();

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // 이미 저장된 points x좌표 조정
    if (width !== prevWidth && prevWidth !== 0) {
      const newPoints: PointData[] = points.map((point) => ({ ...point, x: point.x * (width / prevWidth) }));
      setPoints(newPoints);
    }
    setPrevWidth(width);
  }, [width, points, prevWidth]);

  return { width, points, containerRef };
};

export default useMovePointByWidth;
