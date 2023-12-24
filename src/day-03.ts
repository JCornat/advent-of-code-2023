import * as Utils from './utils';

init()
  .catch(console.error);

async function init() {
  const lines = await Utils.readLines('day-03.txt');
  const part1 = solve(lines);
  const part2 = 0;

  console.log(`Part 1 : ${part1}`);
  console.log(`Part 2 : ${part2}`);
}

export function solve(lines: string[]): number {
  const extractedLines: { extractedNumbers: ExtractedNumber[], extractedSymbols: ExtractedSymbol[] }[] = [];
  for (const line of lines) {
    const extractedNumbers = extractNumbers(line);
    const extractedSymbols = extractSymbols(line);
    extractedLines.push({ extractedNumbers, extractedSymbols });
  }

  const adjacentNumbers: ExtractedNumber[] = [];
  for (let i = 0; i < extractedLines.length; i++) {
    const previousLine = extractedLines[i - 1];
    const currentLine = extractedLines[i];
    const nextLine = extractedLines[i + 1];
    const filteredNumbers = filterNumbers({ previousLineSymbols: previousLine?.extractedSymbols, currentLineSymbols: currentLine.extractedSymbols, currentLineNumbers: currentLine.extractedNumbers, nextLineSymbols: nextLine?.extractedSymbols });
    adjacentNumbers.push(...filteredNumbers.adjacentNumbers);
  }

  return adjacentNumbers.reduce((accumulator, value) => {
    return accumulator + value.value;
  }, 0);
}

interface ExtractedNumber {
  value: number;
  index: number;
}

export function extractNumbers(line: string): ExtractedNumber[] {
  const res = [];
  let initialIndex = NaN;
  let currentNumber = '';
  for (let i = 0; i < line.length; i++) {
    const character = line[i];
    const number = +character;
    if (isNaN(number)) {
      if (currentNumber) {
        const value = {
          value: +currentNumber,
          index: initialIndex,
        };

        res.push(value);
        initialIndex = NaN;
        currentNumber = '';
      }

      continue;
    }

    if (isNaN(initialIndex)) {
      initialIndex = i;
    }

    currentNumber += character;
  }

  return res;
}

interface ExtractedSymbol {
  value: string;
  index: number;
}

export function extractSymbols(line: string): ExtractedSymbol[] {
  const res = [];
  for (let i = 0; i < line.length; i++) {
    const character = line[i];
    if (character === '.' || !isNaN(+character)) {
      continue;
    }

    const value = {
      value: character,
      index: i,
    };

    res.push(value);
  }

  return res;
}

export function detectAdjacentSymbol(options: { extractedSymbols: ExtractedSymbol[], extractedNumbers: ExtractedNumber[] }): { adjacentNumbers: ExtractedNumber[], nonAdjacentNumbers: ExtractedNumber[] } {
  const adjacentNumbers: ExtractedNumber[] = [];
  const nonAdjacentNumbers: ExtractedNumber[] = [];

  for (const extractedNumber of options.extractedNumbers) {
    const beginIndex = extractedNumber.index - 1;
    const endIndex = extractedNumber.index + (extractedNumber.value + '').length;

    let isAdjacent = false;
    for (const extractedSymbol of options.extractedSymbols) {
      if (beginIndex <= extractedSymbol.index && extractedSymbol.index <= endIndex) {
        isAdjacent = true;
        break;
      }
    }

    if (!isAdjacent) {
      nonAdjacentNumbers.push(extractedNumber);
      continue;
    }

    adjacentNumbers.push(extractedNumber);
  }

  return {
    adjacentNumbers,
    nonAdjacentNumbers,
  };
}

export function filterNumbers(options: { previousLineSymbols?: ExtractedSymbol[], currentLineSymbols: ExtractedSymbol[], currentLineNumbers: ExtractedNumber[], nextLineSymbols?: ExtractedSymbol[] }): { adjacentNumbers: ExtractedNumber[], nonAdjacentNumbers: ExtractedNumber[] } {
  const adjacentNumbers: ExtractedNumber[] = [];
  let nonAdjacentNumbers: ExtractedNumber[] = [...options.currentLineNumbers];

  if (options.previousLineSymbols) {
    const a = detectAdjacentSymbol({ extractedNumbers: nonAdjacentNumbers, extractedSymbols: options.previousLineSymbols });
    adjacentNumbers.push(...a.adjacentNumbers);
    nonAdjacentNumbers = a.nonAdjacentNumbers;
  }

  const b = detectAdjacentSymbol({ extractedNumbers: nonAdjacentNumbers, extractedSymbols: options.currentLineSymbols });
  adjacentNumbers.push(...b.adjacentNumbers);
  nonAdjacentNumbers = b.nonAdjacentNumbers;

  if (options.nextLineSymbols) {
    const c = detectAdjacentSymbol({ extractedNumbers: nonAdjacentNumbers, extractedSymbols: options.nextLineSymbols });
    adjacentNumbers.push(...c.adjacentNumbers);
    nonAdjacentNumbers = c.nonAdjacentNumbers;
  }

  return {
    adjacentNumbers,
    nonAdjacentNumbers,
  };
}
