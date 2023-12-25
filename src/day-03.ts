import * as Utils from './utils';

init()
  .catch(console.error);

async function init() {
  const lines = await Utils.readLines('day-03.txt');
  const part1 = solvePart1(lines);
  const part2 = solvePart2(lines);

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

        if (j === (line.length - 1) && keepNumber) { // If last line
          sum += +number;
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

export function get2DElement(options: { lines: string[], i: number, j: number }) {
  return options.lines[options.i]?.[options.j];
}

export function hasSymbolAround(options: { lines: string[], i: number, j: number }): boolean {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i === 1 && j === 1) { // Ignore current cell
        continue;
      }

      const newI = options.i + i - 1;
      const newJ = options.j + j - 1;
      const character = get2DElement({ lines: options.lines, i: newI, j: newJ });
      const hasSymbol = isSymbol(character);
      if (hasSymbol) {
        return true;
      }
    }
  }

  return false;
}

export function solvePart2(lines: string[]): number {
  let sum = 0;
  const extractedNumbersAllLines = [];
  for (const line of lines) {
    const numbers = Utils.extractNumbers(line);
    extractedNumbersAllLines.push(numbers);
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line?.length; j++) {
      const character = line[j];
      if (character === '*') {
        const cells = detectNumberCellsAround({ lines, i, j });
        const extractedNumbers = extractNumbers({ extractedNumbersAllLines, cells });
        if (extractedNumbers.length === 2) {
          sum += (extractedNumbers[0] * extractedNumbers[1]);
        }
      }
    }
  }

  return sum;
}

export function detectNumberCellsAround(options: { lines: string[], i: number, j: number }): number[][] {
  const cells = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i === 1 && j === 1) { // Ignore current cell
        continue;
      }

      const newI = options.i + i - 1;
      const newJ = options.j + j - 1;
      const character = get2DElement({ lines: options.lines, i: newI, j: newJ });
      const hasNumber = Utils.isNumber(character);
      if (hasNumber) {
        cells.push([newI, newJ]);
      }
    }
  }

  return cells;
}

export function extractNumbers(options: { extractedNumbersAllLines: { value: number, index: number }[][], cells: number[][] }): number[] {
  const obj: Record<string, { value: number, index: number }> = {};
  for (const cell of options.cells) {
    const row = cell[0];
    const column = cell[1];
    const numbers = options.extractedNumbersAllLines[row];
    for (const number of numbers) {
      if (number.index <= column && number.index + (number.value + '').length >= column) {
        obj[`${number.value}:${number.index}`] = number;
      }
    }
  }

  return Object.values(obj)
    .map((value) => {
      return value.value;
    });
}
