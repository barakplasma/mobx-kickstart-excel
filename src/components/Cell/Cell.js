import React from 'react';
import PropTypes from 'prop-types';
import s from './Cell.scss';
import {getCellMapValue, convertCellLocation, store} from '../App/index';
import {observer} from 'mobx-react';
import {action} from 'mobx';

export const setSelectedCell = action(location => {
  store.selectedCell = location;
});

const Cell = observer(({rowIndex, cellIndex}) => {
  const innerContent = getCellMapValue(convertCellLocation(rowIndex, cellIndex));
  // eslint-disable-next-line no-unused-vars
  const printLocation = () => `r${rowIndex},c${cellIndex} :`;

  const setFormulaEditorValue = action(() => {
    store.FormulaEditorValue = innerContent.formula;
    setSelectedCell(convertCellLocation(rowIndex, cellIndex));
  });

  // todo when clicking a cell without a cell Value, create a new object there and set it

  return (
    <td
      className={s.cell}
      onClick={setFormulaEditorValue}
    >
      {innerContent.value}
    </td>
  );
});

Cell.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  cellIndex: PropTypes.number.isRequired
};

export default Cell;
