export {default} from './App';
import {observable, computed, reaction, autorun} from 'mobx';
import _ from 'lodash';

const cells = observable([]);

const report = () => cells.length === 0 ? '<none>' : `${JSON.stringify(cells.map(cell => cell.location))}`;

autorun(() => console.log(report()));

const generateNewCell = (location, value) => {
  cells.push({
    location,
    value
  });
  // console.log(`pushed ${JSON.stringify(location)} to create ${JSON.stringify(cells)}`);
};

generateNewCell({x: 'A', y: 2}, '13');
// console.log('report one new cell: ', report());
