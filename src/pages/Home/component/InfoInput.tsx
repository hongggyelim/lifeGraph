interface Props {
  type: string;
  name: string;
}
const InfoInput = ({ type, name }: Props) => {
  return (
    <>
      <label htmlFor={name}>
        태어난 년도를 입력해주세요
        <input type={type} name={name} />
      </label>
    </>
  );
};

export default InfoInput;
