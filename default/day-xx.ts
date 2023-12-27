import * as Utils from './utils';

init()
  .catch(console.error);

async function init() {
  const lines = await Utils.readLines('day-xx.txt');
  const part1 = solvePart1(lines);
  const part2 = solvePart2(lines);

  console.log(`Part 1 : ${part1}`);
  console.log(`Part 2 : ${part2}`);
}

export function solvePart1(lines: string[]) {
  const sum = 0;
  for (const line of lines) {
    //
  }

  return sum;
}

export function solvePart2(lines: string[]) {
  const sum = 0;
  for (const line of lines) {
    //
  }

  return sum;
}
