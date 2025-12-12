import { Link } from 'react-router-dom';
import style from './Header.module.css';

export const Header = () => (
  <header className={style.header}>
    <Link to={'/'}>
      <div className={style.logo}>
        <span>ENGLISH </span>
        <span>G</span>
        <span>A</span>
        <span>M</span>
        <span>E</span>
        <span>S</span>
      </div>
    </Link>
    <nav>
      <Link to={'/'}>Главная</Link>
      <Link to={'/games'}>Игры</Link>
    </nav>
  </header>
);
