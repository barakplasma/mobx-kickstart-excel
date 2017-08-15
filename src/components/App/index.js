export {default} from './App';
import {observable, computed, reaction, autorun, toJS} from 'mobx';
import _ from 'lodash';

const cells = observable([]);

const report = () => cells.length === 0 ? '<none>' : `${JSON.stringify(cells.map(cell => cell.location))}`;


autorun(() => console.log(report()));

const generateNewCell = (location, value) => {
  cells.push({
    location,
    value
  });
};

export const getCellValue = location => {
  return _.find(toJS(cells), {location}) || ' ';
};

const generateLocation = (x, y) => ({x, y});
export const convertCellLocation = (row, cell) => generateLocation(cell, row);

generateNewCell(generateLocation(1, 3), _.random(21, 32));
generateNewCell(generateLocation(1, 5), _.random(21, 32));
generateNewCell(generateLocation(1, 7), _.random(21, 32));

console.log('get A5', getCellValue(generateLocation(1, 5)));

// console.log(toJS(cells));
