import fs from 'fs';
import path from 'path';

const rows = fs.readFileSync(path.join(__dirname, '../input/6.txt'));
const values = rows.toString().split(`\n\n`);

const answers: Set<string>[] = values.map((group) => {
  let groupSet: Set<string> = new Set();
  group.split('\n').forEach((person) => {
    person.split('').forEach((answer) => {
      groupSet.add(answer);
    });
  });
  return groupSet;
});

console.log(answers.reduce((a, b) => a + b.size, 0));

const intersect = (setA: Set<string>, setB: Set<string>) => {
  return new Set([...setA].filter((item) => setB.has(item)));
};

const part2 = values.map((group) =>
  group
    .split('\n')
    .map((person) => new Set(person.split('')))
    .reduce(intersect)
);

console.log(part2.reduce((a, b) => a + b.size, 0));
