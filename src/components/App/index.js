export {default} from './App';
import {observable, computed, reaction, autorun, toJS, action} from 'mobx';
import _ from 'lodash';

const cells = observable(new Map([]));

const report = () => `${JSON.stringify(toJS(cells.entries()))}`;

autorun(() => console.log(report()));

const formulaComputation = formula => {
  // eslint-disable-next-line no-eval
  return {formula, value: eval(formula)};
};

const generateNewCell = action((location, formula) => {
// formula is the stored value and the displayed text should be a computed value
  cells.set(location, formulaComputation(formula));
});

export const getCellMapValue = location => {
  return cells.get(location) || ' ';
};

const generateLocation = (x, y) => `${x},${y}`;
export const convertCellLocation = (row, cell) => generateLocation(cell, row);

generateNewCell(generateLocation(1, 3), _.random(21, 32));
generateNewCell(generateLocation(1, 5), _.random(21, 32));
generateNewCell(generateLocation(1, 7), _.random(21, 32));
generateNewCell(generateLocation(5, 5), `${_.random(21, 32)}*200`);

console.log('get A5', getCellMapValue(generateLocation(1, 5)).value);

// console.log(toJS(cells));


/* todo add a selected_cell property on state
which is changed by an action which gets the clicked cells location */
