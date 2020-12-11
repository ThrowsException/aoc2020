import fs from 'fs';
import path from 'path';

const rows = fs.readFileSync(path.join(__dirname, '../input/4.txt'));
const values = rows.toString().split(`\n\n`);

const northPole = ['cid'];
const fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

/**
 * byr (Birth Year) - four digits; at least 1920 and at most 2002.
iyr (Issue Year) - four digits; at least 2010 and at most 2020.
eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
hgt (Height) - a number followed by either cm or in:
If cm, the number must be at least 150 and at most 193.
If in, the number must be at least 59 and at most 76.
hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
pid (Passport ID) - a nine-digit number, including leading zeroes.
cid (Country ID) - ignored, missing or not.
 */

const byr = (input: string): boolean => {
  if (!/\d{4}/.test(input)) {
    return false;
  }
  const year = parseInt(input, 10);
  return year >= 1920 && year <= 2002;
};

const iyr = (input: string): boolean => {
  if (!/\d{4}/.test(input)) {
    return false;
  }
  const year = parseInt(input, 10);
  return year >= 2010 && year <= 2020;
};

const eyr = (input: string): boolean => {
  if (!/\d{4}/.test(input)) {
    return false;
  }
  const year = parseInt(input, 10);
  return year >= 2020 && year <= 2030;
};

const hgt = (input: string): boolean => {
  if (!/\d*(in|cm)/.test(input)) {
    return false;
  }

  let type = input.indexOf('cm') === -1 ? 'in' : 'cm';
  let height = 0;
  const values = /\d*/.exec(input);
  if (values) {
    height = parseInt(values[0]);
  }

  if (type === 'in') {
    return height >= 59 && height <= 76;
  } else if (type === 'cm') {
    return height >= 150 && height <= 193;
  }
  return false;
};

const hcl = (input: string): boolean => {
  return /#[0-9a-f]{6}/.test(input);
};

const ecl = (input: string): boolean => {
  return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].some(
    (item) => item === input
  );
};

const pid = (input: string): boolean => {
  return /^[0-9]{9}$/.test(input);
};

const cid = (_: string): boolean => true;

let validators: { [key: string]: (input: string) => {} } = {
  byr,
  iyr,
  eyr,
  hgt,
  hcl,
  ecl,
  pid,
  cid,
};

const validPassports = values
  .map((item) => item.replace(/\r?\n|\r/g, ' '))
  .filter((item) => fields.every((field) => item.indexOf(field) > -1))
  .map((item) => item.split(' '))
  .filter((item) => {
    let results: string[] = [];
    let every = item.every((field) => {
      const [validator, value] = field.split(':');
      const callable = validators[validator];
      let result = callable(value);
      results.push(`${validator} return ${result} for ${value}`);
      return result;
    });
    if (every) {
      console.log(item);
      console.log(results.join('\n'));
      return every;
    }
  });

console.log(validPassports.length);
