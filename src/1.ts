import fs from 'fs';
import path from 'path';
import os from 'os';

type ReducerFunction<T> = (
  accumulator: T,
  currentValue: T,
  currentIndex?: number,
  array?: T[]
) => T;

/**
 * Uses the 'odometer' method looping through combinations based
 * on the number of operands
 *
 * e.g
 * operands = 2
 *
 * go through
 * [0, 0] [0, 1] [1, 0] [1, 1]
 *
 * using the odometer as indexes to the values and stopping when
 * the reducer finds the desired value is found
 */
function reduceToValue(
  operands: number,
  values: string[],
  value: number,
  fn: ReducerFunction<number>
): number[] {
  let track = Array.from({ length: operands }, (_, i) => 0);
  let vals = track.map((item) => parseInt(values[item]), 10);

  while (track[0] !== values.length - 1 && values.length >= operands - 1) {
    if (vals.reduce(fn) !== value) {
      return vals;
    } else {
      for (let i = track.length - 1; i >= 0; i--) {
        if (i === 0) {
          console.log('Start another round');
          values.shift();
          track = track.fill(0);
          i = -1; //bail
        } else if (track[i] !== values.length - 1) {
          track[i] = track[i] + 1;
          i = -1; //bail
        } else if (track[i] === values.length - 1) {
          track[i] = 0;
        }
      }
    }
    //get next vals
    vals = track.map((item) => parseInt(values[item]), 10);
  }

  return vals;
}

const rows = fs.readFileSync(path.join(__dirname, '../input/1.txt'));
const values = rows.toString().split(os.EOL);
const result = reduceToValue(3, values, 2020, (a, b) => a + b).reduce(
  (acc, curr) => acc * curr
);
console.log(result);
