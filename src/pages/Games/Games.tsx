import { Link } from 'react-router-dom';
import style from './Games.module.css';

export const Games = () => {
  return (
    <div className={style.Games}>
      <h1>Все игры</h1>
      <Link to={'/bricks'}>
        <img src="https://static.vecteezy.com/ti/vettori-gratis/p1/21680280-casino-piatto-dado-impostato-isolato-vettore-illustrazione-per-gioco-d-azzardo-giochi-disegno-tavolo-o-tavola-giochi-craps-e-poker-bianca-cubi-con-casuale-numeri-di-nero-puntini-o-semi-e-arrotondato-bordi-gratuito-vettoriale.jpg" />
      </Link>
    </div>
  );
};
