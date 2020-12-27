import fs from 'fs';
import path from 'path';

type Bag = [number, string][];
interface BagDS {
  [color: string]: Bag;
}

const rows = fs.readFileSync(path.join(__dirname, '../input/7.txt'));
const values = rows.toString().split(`\n`);

const bagRegex = /^((?<color>.*) bags)/;
const bagRegex2 = /((?<number>\d) (?<color>.*?) bag)/g;

let bagDS: BagDS = {};

values.forEach((item) => {
  const [f, b] = item.split('contain');
  const bag: string = f.match(bagRegex)?.groups?.color || '';
  const matches: Bag = [...b.matchAll(bagRegex2)].map((item) => [
    parseInt(item.groups?.number ?? '', 10),
    item.groups?.color ?? '',
  ]);

  bagDS[bag] = matches;
});

const _canContain = (color: string, bag: string) => {
  return bagDS[color].some((item) => item[1] === bag);
};

const canContain = (bag: string, currBag: string): string | null => {
  if (bagDS[currBag] === []) {
    return null;
  }

  let c = bagDS[currBag];
  const result = _canContain(currBag, bag);

  if (result) {
    return currBag;
  } else {
    for (let i = 0; i < c.length; i++) {
      if (canContain(bag, c[i][1])) {
        return currBag;
      }
    }
  }
  return null;
};

const canContainCount = (currBag: string, multiplier: number): number => {
  let c = bagDS[currBag];
  let acc = 0;
  c.forEach((item, i) => {
    if (bagDS[item[1]].length === 0) {
      acc += item[0] * multiplier;
    } else {
      acc += canContainCount(item[1], item[0] * multiplier);
      acc += item[0] * multiplier;
    }
  });
  return acc;
};

const results = new Set();
for (const bag in bagDS) {
  const r = canContain('shiny gold', bag);
  if (r) {
    results.add(r);
  }
}
console.log(results);

//part 2
console.log(canContainCount('shiny gold', 1));
