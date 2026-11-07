import { Link } from "react-router-dom";
import "./not-found.scss";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <Link className="back-button" to="/">
        돌아가기
      </Link>
    </div>
  );
};

export default NotFound;
