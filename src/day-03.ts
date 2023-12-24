import * as Utils from './utils';

init()
  .catch(console.error);

async function init() {
  const lines = await Utils.readLines('day-03.txt');
  const part1 = solvePart1(lines);
  const part2 = 0;

  console.log(`Part 1 : ${part1}`);
  console.log(`Part 2 : ${part2}`);
}

export function solvePart1(lines: string[]): number {
  let sum = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let number = '';
    let keepNumber = false;
    for (let j = 0; j < line?.length; j++) {
      const character = line[j];
      if (Utils.isNumber(character)) {
        number += character;
        if (hasSymbolAround({ lines, i, j })) {
          keepNumber = true;
        }

        continue;
      }

      if (number) {
        if (keepNumber) {
          sum += +number;
        }

        number = '';
        keepNumber = false;
      }
    }
  }

  return sum;
}

export function isSymbol(character: string): boolean {
  if (character === '.') {
    return false;
  }

  if (Utils.isNumber(character)) {
    return false;
  }

  if (!character) {
    return false;
  }

  return true;
}

export function hasSymbolAround(options: { lines: string[], i: number, j: number }): boolean {
  const topLeft = isSymbol(options.lines[options.i - 1]?.[options.j - 1]);
  if (topLeft) {
    return true;
  }

  const topTop = isSymbol(options.lines[options.i - 1]?.[options.j]);
  if (topTop) {
    return true;
  }

  const topRight = isSymbol(options.lines[options.i - 1]?.[options.j + 1]);
  if (topRight) {
    return true;
  }

  const middleLeft = isSymbol(options.lines[options.i][options.j - 1]);
  if (middleLeft) {
    return true;
  }

  const middleRight = isSymbol(options.lines[options.i][options.j + 1]);
  if (middleRight) {
    return true;
  }

  const bottomLeft = isSymbol(options.lines[options.i + 1]?.[options.j - 1]);
  if (bottomLeft) {
    return true;
  }

  const bottomTop = isSymbol(options.lines[options.i + 1]?.[options.j]);
  if (bottomTop) {
    return true;
  }

  const bottomRight = isSymbol(options.lines[options.i + 1]?.[options.j + 1]);
  if (bottomRight) {
    return true;
  }

  return false;
}
