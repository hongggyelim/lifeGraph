const Point = ({ x, y }: { x: number; y: number }) => {
  return (
    <div
      style={{
        position: "absolute",
        width: "4px",
        height: "4px",
        color: "blue",
        top: `${y - 5}px`,
        left: `${x - 5}px`,
        borderRadius: "50%",
      }}
    >
      ●
    </div>
  );
};

export default Point;
