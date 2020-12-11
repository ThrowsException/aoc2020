import fs from 'fs';
import path from 'path';
import os from 'os';

const rows = fs.readFileSync(path.join(__dirname, '../input/3.txt'));
const values = rows.toString().split(os.EOL);

const slopes: number[][] = [
  [1, 1],
  [1, 3],
  [1, 5],
  [1, 7],
  [2, 1],
];

const sloper = (rise: number, run: number): number => {
  let x = 0;
  let y = 0;
  let trees = 0;
  while (y < values.length) {
    let row = [...values[y]];
    let pos = row[x % row.length];

    if (pos === '#') {
      trees = trees + 1;
    }

    //console.log(x, y, pos);
    x = x + run;
    y = y + rise;
  }

  console.log(trees);
  return trees;
};

let result = slopes
  .map((item) => sloper(item[0], item[1]))
  .reduce((a, b) => a * b);
console.log(result);
