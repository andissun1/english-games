import style from './Table.module.css';
import { Fragment, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  disastersSelectors,
  disastersActions,
} from '../../../../store/naturalDisastersReducer';

type IGameInfo = {
  title: String;
  description: String;
  question: String;
  image: String;
};

export const Table = ({
  isOpenEditor,
  setIsOpenEditor,
  topicInfo,
}: {
  isOpenEditor: Boolean;
  setIsOpenEditor: Function;
  topicInfo: IGameInfo;
}) => {
  const { board } = useAppSelector(disastersSelectors.gameInfo);
  const [fields, setFields] = useState(board);
  const arrayOfFields = Object.values(fields);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [event.target.name]: { value: event.target.value },
    });
  };

  const saveChanges = () => {
    dispatch(disastersActions.setBoard(fields));
    dispatch(disastersActions.setGameInfo(topicInfo));
    setIsOpenEditor(false);
  };

  const openEditor = () => {
    setIsOpenEditor((prev: Boolean) => !prev);
  };

  const resetTemper = () => {
    dispatch(disastersActions.resetPoints());
  };

  const addPoints = (currentCellIndex: Number) => {
    if (Number(currentCellIndex) % 4 === 0) {
      dispatch(disastersActions.addPoints(1));
    } else if (Number(currentCellIndex) % 4 === 1) {
      dispatch(disastersActions.addPoints(2));
    } else if (Number(currentCellIndex) % 4 === 2) {
      dispatch(disastersActions.addPoints(3));
    } else {
      dispatch(disastersActions.addPoints(-1));
    }
  };

  const getRows = () => {
    const rows = Math.ceil(arrayOfFields.length / 4);

    const rowNodes = [];
    for (let index = 0; index < rows; index++) {
      rowNodes.push(
        <tr key={index}>
          {arrayOfFields.slice(index * 4, index * 4 + 4).map((cell, indexCell) => {
            const currentCellIndex = index * 4 + indexCell;

            return (
              <Fragment key={`wrapper-${currentCellIndex}`}>
                <td
                  key={currentCellIndex}
                  id={String(currentCellIndex)}
                  onClick={() => {
                    addPoints(currentCellIndex);
                  }}
                >
                  {isOpenEditor && (
                    <input
                      key={`input-${currentCellIndex}`}
                      type="text"
                      name={String(currentCellIndex)}
                      defaultValue={cell.value}
                      onChange={handleChange}
                      onClick={(event) => event.stopPropagation()}
                    />
                  )}
                  {!isOpenEditor && cell.value}
                </td>
              </Fragment>
            );
          })}
        </tr>
      );
    }

    return rowNodes;
  };

  return (
    <div className={style.board}>
      <table>
        <colgroup>
          <col className={style.firstColumn} />
          <col className={style.secondColumn} />
          <col className={style.thirdColumn} />
          <col className={style.fourthColumn} />
        </colgroup>
        <thead>
          <tr>
            <th>1 point •</th>
            <th>2 points ••</th>
            <th>3 points •••</th>
            <th>-1 point</th>
          </tr>
        </thead>
        <tbody>{getRows()}</tbody>
      </table>

      <button className={style.edit} onClick={openEditor} children="✏️" />
      {isOpenEditor && (
        <>
          <button className={style.save} onClick={saveChanges} children="💾" />
          <button className={style.save} onClick={resetTemper} children="reset score" />
        </>
      )}
    </div>
  );
};
