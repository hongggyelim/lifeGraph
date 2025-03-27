import useInfo from "../../hooks/useInfo";
import "./Header.scss";

const Header = () => {
  const { name } = useInfo();

  return (
    <header>
      <h1>인생 그래프</h1>
      <p>{name + "님" || "당신"}의 인생을 그려보세요</p>
    </header>
  );
};

export default Header;
