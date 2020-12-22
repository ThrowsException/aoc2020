import fs from 'fs';
import path from 'path';

const rows = fs.readFileSync(path.join(__dirname, '../input/5.txt'));
const values = rows.toString().split(`\n`);

const binSearch = (start: number, end: number, input: string[]): number => {
    if(input.length === 0) {
        return start;
    }
    const curr = input.shift();
    if(curr === "B" || curr === "R") {
        start = Math.ceil(start + ((end-start) / 2));
    }
    if(curr === "F" || curr === "L") {
        end = Math.floor(end - ((end-start) / 2));
    }
    return binSearch(start, end, input);
}

const ids = values.map(item => {
    let row = binSearch(0, 127, item.split('').splice(0,7));
    let col = binSearch(0, 7, item.split('').slice(7));
    return (row * 8) + col;
})

const highest = ids.reduce((a, b) => {
    return Math.max(a, b);
});

const sortedIds = ids.sort((a,b) => a-b );

const s = new Set<number>();
const m = new Set<number>([...sortedIds]);

const length = sortedIds[sortedIds.length-1] - sortedIds[0];
for(let i = 0; i < length; i++) {
    s.add(i + sortedIds[0]);
}

let difference = new Set([...s].filter(x => !m.has(x)));
console.log(difference);