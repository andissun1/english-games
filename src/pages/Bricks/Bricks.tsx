import { Link } from 'react-router-dom';
import style from './Bricks.module.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { bricksActions, bricksSelectors } from '../../store/bricksReducer';
import AnimatedNumber from 'react-animated-numbers';
import React, { useState } from 'react';

export const Bricks = () => {
  const numbers = useAppSelector(bricksSelectors.numbers);
  const [isOpenEditor, setIsOpenEditor] = useState(false);
  const board = useAppSelector(bricksSelectors.board);

  const [fields, setFields] = useState(board);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [event.target.name]: { value: event.target.value, isOpen: false },
    });
  };

  const saveChanges = () => {
    dispatch(bricksActions.setBoard(fields));
    dispatch(bricksActions.closeAllCards());
    setIsOpenEditor(false);
  };

  const toggleCard = (key: string) => {
    if (typeof key === 'string') {
      fields[key].isOpen
        ? setFields({
            ...fields,
            [key]: { ...fields[key], isOpen: false },
          })
        : setFields({
            ...fields,
            [key]: { ...fields[key], isOpen: true },
          });
    }
  };

  const updateNumbers = () => {
    let currentFields = [];
    for (let index in fields) if (!fields[index].isOpen) currentFields.push(index);

    let numbers = new Array(
      Math.floor(Math.random() * 5 + 1),
      Math.floor(Math.random() * 5 + 1)
    );

    let sum = numbers[0] * numbers[1] + 1;

    if (sum > currentFields.length || !currentFields.includes(String(sum))) {
      const randomIndex = Math.floor(Math.random() * currentFields.length);
      const target = Number(currentFields[randomIndex]) + 1;
      numbers = [1, target];
    }

    dispatch(bricksActions.setNumbers(numbers));
  };

  return (
    <div className={style.Bricks}>
      <Link to={'/games'}>✕</Link>
      <div className={style.board}>
        {Object.entries(fields).map(([key, value]) => (
          <div
            key={key}
            id={key}
            className={style.field}
            onClick={(_) => toggleCard(key)}
            style={{
              backgroundColor: fields[key].isOpen
                ? 'rgba(0, 0, 0, 0.3)'
                : 'rgba(255, 255, 255, 0.9)',
              color: fields[key].isOpen ? 'white' : 'black',
            }}
          >
            {isOpenEditor ? (
              <>
                <input
                  type="text"
                  name={String(key)}
                  defaultValue={value.value}
                  onChange={handleChange}
                  onClick={(event) => event.stopPropagation()}
                />
                {/* <span className={style.smallText}>{Number(key) + 1}</span> */}
              </>
            ) : (
              <span onClick={(_) => toggleCard(key)}>
                {value.isOpen ? value.value : Number(key) + 1}
              </span>
            )}
          </div>
        ))}
        <button className={style.edit} onClick={() => setIsOpenEditor((prev) => !prev)}>
          ✏️
        </button>
        {isOpenEditor && (
          <button className={style.save} onClick={saveChanges}>
            💾
          </button>
        )}
      </div>

      <div className={style.bricks}>
        <div className={style.numbers}>
          <AnimatedNumber animateToNumber={numbers.firstNumber || 0} />
          <span> X </span>
          <AnimatedNumber animateToNumber={numbers.secondNumber || 0} />
        </div>
        <button onClick={updateNumbers}>Update Numbers</button>
      </div>
    </div>
  );
};
