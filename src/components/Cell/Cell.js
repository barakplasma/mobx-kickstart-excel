import React from 'react';
import PropTypes from 'prop-types';
import s from './Cell.scss';
import {getCellMapValue, convertCellLocation, store} from '../App/index';
import {observer} from 'mobx-react';
import {action} from 'mobx';

const Cell = observer(({rowIndex, cellIndex}) => {
  const innerContent = getCellMapValue(convertCellLocation(rowIndex, cellIndex));
  // console.log(innerContent.value);
  // eslint-disable-next-line no-unused-vars
  const printLocation = () => `r${rowIndex},c${cellIndex} :`;

  const printFormulaEditorValue = () => console.log('attempted');

  const printEventTarget = e => console.log(e.target.className);
  const setSelectedCell = () => {
    store.selectedCell = 3;
  };
  const setFormulaEditorValue = action(() => {
    store.FormulaEditorValue = innerContent.formula;
    console.log(store.FormulaEditorValue);
  });

  return (
    <td
      className={s.cell}
      onClick={setFormulaEditorValue}>
      {innerContent.value}
    </td>
  );
});

Cell.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  cellIndex: PropTypes.number.isRequired
};

export default Cell;
