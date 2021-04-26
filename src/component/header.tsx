import style from "../styles/header.module.scss";
interface Iprops {
  title: string;
}
const Header = ({ title }: Iprops) => {
  return (
    <>
      <header className={style.header}>
        <h1>{title}</h1>
      </header>
    </>
  );
};

export default Header;
