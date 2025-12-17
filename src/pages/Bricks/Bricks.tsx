import { Link } from 'react-router-dom';
import style from './Bricks.module.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { bricksActions, bricksSelectors } from '../../store/bricksReducer';
import AnimatedNumber from '../../components/AnimatedNumbers/AnimatedNumbers';
import { getRandomNumber } from '../../utils';
import { Board } from './Components/Board/Board';

export const Bricks = () => {
  const numbers = useAppSelector(bricksSelectors.numbers);
  const dispatch = useAppDispatch();

  const updateNumbers = () => {
    const newArray = new Array(getRandomNumber(1, 5), getRandomNumber(1, 5));

    if (newArray[0] == numbers.firstNumber || newArray[1] === numbers.secondNumber) {
      dispatch(bricksActions.setNumbers([0, 0]));
      setTimeout(() => dispatch(bricksActions.setNumbers(newArray)), 100);
    } else dispatch(bricksActions.setNumbers(newArray));
  };

  return (
    <div className={style.Bricks}>
      <Link className={style.close} to={'/'} children={'✕'} />
      <Board />
      <div className={style.numbers}>
        <div>
          <AnimatedNumber animateToNumber={numbers.firstNumber} />
          <span> X </span>
          <AnimatedNumber animateToNumber={numbers.secondNumber} />
        </div>
        <button onClick={updateNumbers}>Update Numbers</button>
      </div>
    </div>
  );
};
