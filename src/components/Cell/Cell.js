import React from 'react';
import PropTypes from 'prop-types';
import s from './Cell.scss';
import {getCellMapValue, convertCellLocation} from '../App/index';
import {observer} from 'mobx-react';

const Cell = observer(({rowIndex, cellIndex}) => {
  const innerContent = getCellMapValue(convertCellLocation(rowIndex, cellIndex));
  // console.log(innerContent.value);
  // eslint-disable-next-line no-unused-vars
  const printLocation = () => `r${rowIndex},c${cellIndex} :`;

  return (
    <td className={s.cell}>{innerContent.value}</td>
  );
});

Cell.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  cellIndex: PropTypes.number.isRequired
};

export default Cell;
