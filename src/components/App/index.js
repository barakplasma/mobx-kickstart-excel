export {default} from './App';
import {observable, computed, reaction, autorun, toJS, action} from 'mobx';
import _ from 'lodash';

const cells = observable(new Map([]));

const report = () => cells.length === 0 ? '<none>' : `${JSON.stringify(Array.from(cells))}`;


autorun(() => console.log(report()));

const generateNewCell = action((location, value) => {
  cells.set(location, value);
});

export const getCellValue = location => {
  return cells.get(location) || ' ';
};

const generateLocation = (x, y) => `${x},${y}`;
export const convertCellLocation = (row, cell) => generateLocation(cell, row);

generateNewCell(generateLocation(1, 3), _.random(21, 32));
generateNewCell(generateLocation(1, 5), _.random(21, 32));
generateNewCell(generateLocation(1, 7), _.random(21, 32));

console.log('get A5', getCellValue(generateLocation(1, 5)));

// console.log(toJS(cells));

// todo formula is the stored value and the displayed text should be a computed value

/* todo add a selected_cell property on state
which is changed by an action which gets the clicked cells location */
