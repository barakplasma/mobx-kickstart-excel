import React from 'react';
import PropTypes from 'prop-types';
import s from './Cell.scss';
import {getCellValue, convertCellLocation} from '../App/index';

function Cell({rowIndex, cellIndex}) {
  let innerContent = getCellValue(convertCellLocation(rowIndex, cellIndex));
  console.log(innerContent);

  return (
    <td className={s.cell}>{innerContent}</td>
  );
}

Cell.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  cellIndex: PropTypes.number.isRequired
};

export default Cell;
