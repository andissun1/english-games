import { Link } from 'react-router-dom';
import style from './Games.module.css';

export const Games = () => {
  return (
    <div className={style.Games}>
      <h1>Все игры</h1>
      <Link to={'/bricks'}>
        <img src="/images/Bricks.jpeg" />
      </Link>
      <Link to={'/NaturalDisasters'}>
        <img src="/images/NaturalDisasters.png" />
      </Link>
    </div>
  );
};
