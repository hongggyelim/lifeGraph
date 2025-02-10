import { useEffect, useRef } from "react";

const Graph = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // 캔버스 크기 가져오기
        const width = canvas.width;
        const height = canvas.height;

        // 배경 색상 설정
        ctx.fillStyle = "transparent";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // x, y 축 그리기
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;

        // x축 (가운데로 설정)
        const centerY = height / 2;

        // x축 (가로)
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        ctx.stroke();

        // y축 (세로)
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, height);
        ctx.stroke();
      } else {
        // canvas 미지원 시
      }
    }
  }, []);

  return (
    <div className="graph-container">
      <canvas ref={canvasRef} width={500} height={500}></canvas>
    </div>
  );
};

export default Graph;
