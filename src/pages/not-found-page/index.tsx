import "./not-found.scss";
const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <a className="back-button" href="/">
        돌아가기
      </a>
    </div>
  );
};

export default NotFound;
