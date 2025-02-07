import InfoInput from "./component/InfoInput";
import "./home.scss";

const index = () => {
  return (
    <div>
      <div>당신의 인생을 그려보세요</div>
      <form id="form">
        <InfoInput type="text" name="name" />
        <InfoInput type="number" name="birthYear" />
      </form>
    </div>
  );
};

export default index;
