import "./graph.scss";

const Graph = ({ onClick }: { onClick: (x: number, y: number) => void }) => {
  return (
    <div
      className="graph-container"
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        onClick(x, y);
      }}
    >
      <div className="graph-upper"></div>
      <div className="graph-below"></div>
    </div>
  );
};

export default Graph;
