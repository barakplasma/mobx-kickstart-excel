export {default} from './App';
import {observable, computed, reaction, autorun, toJS} from 'mobx';
import _ from 'lodash';

const cells = observable([]);

const report = () => cells.length === 0 ? '<none>' : `${JSON.stringify(cells.map(cell => cell.location))}`;

const printOneCell = () => toJS(cells[1]);

autorun(() => console.log(report()));

const generateNewCell = (location, value) => {
  cells.push({
    location,
    value
  });
};

const getCellValue = location => {
  return _.find(toJS(cells), {location});
};

generateNewCell({x: 'A', y: 3}, _.random(21, 32));
generateNewCell({x: 'A', y: 5}, _.random(21, 32));
generateNewCell({x: 'A', y: 7}, _.random(21, 32));

console.log('get A5', getCellValue({x: 'A', y: 5}));

// console.log(printOneCell());
// console.log(toJS(cells));
