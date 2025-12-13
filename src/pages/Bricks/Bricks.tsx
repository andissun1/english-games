import { Link } from 'react-router-dom';
import style from './Bricks.module.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { bricksActions, bricksSelectors } from '../../store/bricksReducer';
import AnimatedNumber from '../../components/AnimatedNumbers/AnimatedNumbers';
import React, { useState } from 'react';
import { getRandomNumber } from '../../utils';

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
    const newArray = new Array(getRandomNumber(1, 5), getRandomNumber(1, 5));

    console.log(
      newArray[0] == numbers.firstNumber || newArray[1] === numbers.secondNumber
    );

    if (newArray[0] == numbers.firstNumber || newArray[1] === numbers.secondNumber) {
      dispatch(bricksActions.setNumbers([0, 0]));

      setTimeout(() => {
        dispatch(bricksActions.setNumbers(newArray));
      }, 100);
    } else {
      dispatch(bricksActions.setNumbers(newArray));
    }
  };

  const arrayOfFields = Object.values(fields);
  const rows = [
    arrayOfFields.slice(0, 5),
    arrayOfFields.slice(5, 10),
    arrayOfFields.slice(10, 15),
    arrayOfFields.slice(15, 20),
    arrayOfFields.slice(20, 25),
  ];

  return (
    <div className={style.Bricks}>
      <Link to={'/games'}>✕</Link>
      <div className={style.board}>
        <table>
          <colgroup>
            <col className={style.firstColumn} />
          </colgroup>
          <thead>
            <tr>
              <th />
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className={
                  index === 0
                    ? style.firstLine
                    : index === rows.length - 1
                    ? style.lastLine
                    : ''
                }
              >
                <td>{index + 1}</td>
                {row.map((cell, indexCell) => (
                  <td
                    key={cell.value}
                    id={`${indexCell}`}
                    className={style.field}
                    onClick={(_) => toggleCard(`${index * 5 + indexCell}`)}
                    style={{
                      backgroundColor: fields[index * 5 + indexCell].isOpen
                        ? 'rgba(0, 0, 0, 0.3)'
                        : 'rgba(255, 255, 255, 0.9)',
                      color: fields[index * 5 + indexCell].isOpen ? 'white' : 'black',
                    }}
                  >
                    {isOpenEditor && (
                      <>
                        <input
                          type="text"
                          name={String(index * 5 + indexCell)}
                          defaultValue={fields[index * 5 + indexCell].value}
                          onChange={handleChange}
                          onClick={(event) => event.stopPropagation()}
                        />
                      </>
                    )}
                    {cell.isOpen ? cell.value : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

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
          <AnimatedNumber animateToNumber={numbers.firstNumber} />
          <span> X </span>
          <AnimatedNumber animateToNumber={numbers.secondNumber} />
        </div>
        <button onClick={updateNumbers}>Update Numbers</button>
      </div>
    </div>
  );
};
