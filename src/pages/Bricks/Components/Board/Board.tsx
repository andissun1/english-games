import { Fragment, useState } from 'react';
import style from './Board.module.css';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { bricksActions, bricksSelectors } from '../../../../store/bricksReducer';

export const Board = () => {
  const board = useAppSelector(bricksSelectors.board);
  const [isOpenEditor, setIsOpenEditor] = useState(false);
  const [fields, setFields] = useState(board);
  const arrayOfFields = Object.values(fields);
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

  const openEditor = () => {
    setIsOpenEditor((prev) => !prev);
    dispatch(bricksActions.closeAllCards());
  };

  const getColumns = () => {
    const columns = Math.ceil(arrayOfFields.length / 5);
    const columnNodes = [<th key="-1" />];
    for (let index = 0; index < columns; index++)
      columnNodes.push(<th key={`column-${index}`}>{index + 1}</th>);
    return columnNodes;
  };

  const getRows = () => {
    const rows = Math.ceil(arrayOfFields.length / 5);
    const rowNodes = [];
    for (let index = 0; index < rows; index++) {
      rowNodes.push(
        <tr key={index}>
          {arrayOfFields.slice(index * 5, index * 5 + 5).map((cell, indexCell) => {
            const currentCellIndex = index * 5 + indexCell;

            return (
              <Fragment key={`wrapper-${currentCellIndex}`}>
                {currentCellIndex % 5 === 0 && (
                  <td key={`row-${currentCellIndex}`}>{index + 1}</td>
                )}
                <td
                  key={currentCellIndex}
                  id={String(currentCellIndex)}
                  className={`${style.field} ${
                    cell.isOpen ? style.openField : style.closedField
                  }`}
                  onClick={(_) => toggleCard(String(currentCellIndex))}
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
                  {cell.isOpen ? cell.value : ''}
                </td>
              </Fragment>
            );
          })}
        </tr>
      );
    }

    return rowNodes;
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

  return (
    <div className={style.board}>
      <table>
        <colgroup>
          <col className={style.firstColumn} />
        </colgroup>
        <thead>
          <tr>{getColumns()}</tr>
        </thead>
        <tbody>{getRows()}</tbody>
      </table>

      <button className={style.edit} onClick={openEditor} children="✏️" />
      {isOpenEditor && (
        <button className={style.save} onClick={saveChanges} children="💾" />
      )}
    </div>
  );
};
