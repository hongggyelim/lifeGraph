import { useEffect, useState } from "react";

const useWidth = () => {
  // debounce 추가하기
  const [width, setWidth] = useState(window.innerWidth);

  // 윈도우 리사이즈 감지
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { width };
};

export default useWidth;
