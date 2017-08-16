export {default} from './App';
import {observable, computed, reaction, autorun, toJS, action} from 'mobx';
import _ from 'lodash';

const cells = observable(new Map([]));

const report = () => `${JSON.stringify(toJS(cells.entries()))}`;

autorun(() => console.log(report()));

const generateNewCell = action((location, formula) => {
// formula is the stored value and the displayed text should be a computed value
  cells.set(location, formulaComputation(formula));
});

export const getCellMapValue = location => {
  return cells.get(location) || ' ';
};

const generateLocation = (x, y) => `${x},${y}`;
export const convertCellLocation = (row, cell) => generateLocation(cell + 1, row + 1);

/**
 * Computes Formula result for Spreadsheet
 * @param {string|number} formula
 * @returns {{formula: string, value: object}}
 */
const formulaComputation = formula => {
  if (formula.toString().includes('=')) {
    const searchResults = formula.match(/^=(\w)([0-9])(.*)/);
    const [, x, y, formulaMath] = searchResults;
    const letterInts = {'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9, 'J': 10};
    const letterToInt = letter => letterInts[letter];
    const referredValue = toJS(getCellMapValue(generateLocation(letterToInt(x), parseInt(y)))).value;
    // eslint-disable-next-line no-eval
    const formulaResult = eval(`${referredValue}${formulaMath}`);
    return {formula, value: formulaResult};
  }
  // eslint-disable-next-line no-eval
  return {formula, value: eval(formula)};
};

generateNewCell(generateLocation(1, 3), _.random(21, 32));
generateNewCell(generateLocation(1, 5), _.random(21, 32));
generateNewCell(generateLocation(1, 7), _.random(21, 32));
generateNewCell(generateLocation(5, 5), `${_.random(21, 32)}*200`);
generateNewCell(generateLocation(6, 5), 5);
generateNewCell(generateLocation(6, 6), `=F5*5`);
generateNewCell(generateLocation(1, 1), `=A5*3`);

console.log('get A5', getCellMapValue(generateLocation(1, 5)).value);

// console.log(toJS(cells));

/* todo add a selected_cell property on state
 which is changed by an action which gets the clicked cells location */
export const store = observable({selectedCell: '', FormulaEditorValue: ''});
