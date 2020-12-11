import fs from 'fs';
import path from 'path';
import os from 'os';

const rows = fs.readFileSync(path.join(__dirname, '../input/2.txt'));
const values = rows.toString().split(os.EOL);

const result = values.filter((item) => {
  let [policy, char, password] = item.split(' ');

  let [lower, upper] = policy.split('-').map((item) => parseInt(item, 10));
  char = char[0];

  let policyCharacters = [...password].filter((item) => item === char);
  console.log(char, upper, lower, policyCharacters);

  return policyCharacters.length >= lower && policyCharacters.length <= upper;
});
console.log(result);
console.log(result.length);

const result2 = values.filter((item) => {
  let [policy, char, password] = item.split(' ');

  let [lower, upper] = policy.split('-').map((item) => parseInt(item, 10));
  char = char[0];

  let policyCharacters = ['', ...password];
  console.log(char, lower, upper, policyCharacters);

  let char1 = policyCharacters[lower];
  let char2 = policyCharacters[upper];

  if (char1 === char && char2 === char) {
    return false;
  }

  return [char1, char2].some((item) => item === char);
});

console.log(result2);
console.log(result2.length);
