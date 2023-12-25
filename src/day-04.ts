import * as Utils from './utils';

init()
  .catch(console.error);

async function init() {
  const lines = await Utils.readLines('day-04.txt');
  const part1 = solvePart1(lines);
  const part2 = solvePart2(lines);

  console.log(`Part 1 : ${part1}`);
  console.log(`Part 2 : ${part2}`);
}

export function calculateScore(matchingNumbers: number[]) {
  if (matchingNumbers.length === 0) {
    return 0;
  }

  if (matchingNumbers.length === 1) {
    return 1;
  }

  return Math.pow(2, matchingNumbers.length - 1);
}

export function solvePart1(lines: string[]) {
  let sum = 0;
  for (const line of lines) {
    const firstSplit = line.split(': ')?.[1];
    const secondSplit = firstSplit.split(' | ');
    const winningExtractedNumbers = Utils.extractNumbers(secondSplit[0]);
    const winningNumbers = winningExtractedNumbers.map((value) => value.value);

    const selectedExtractedNumbers = Utils.extractNumbers(secondSplit[1]);
    const selectedNumbers = selectedExtractedNumbers.map((value) => value.value);

    const matchingNumbers = detectMatchNumbers(winningNumbers, selectedNumbers);
    sum += calculateScore(matchingNumbers);
  }

  return sum;
}

export function detectMatchNumbers(aX: number[], bX: number[]) {
  const res = [];
  for (const bX1 of bX) {
    if (aX.includes(bX1)) {
      res.push(bX1);
    }
  }

  return res;
}

export function solvePart2(lines: string[]) {
  const cards = [];
  for (let i = 0; i < lines.length; i++) {
    cards[i] = 1;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const firstSplit = line.split(': ')?.[1];
    const secondSplit = firstSplit.split(' | ');
    const winningExtractedNumbers = Utils.extractNumbers(secondSplit[0]);
    const winningNumbers = winningExtractedNumbers.map((value) => value.value);

    const selectedExtractedNumbers = Utils.extractNumbers(secondSplit[1]);
    const selectedNumbers = selectedExtractedNumbers.map((value) => value.value);

    const matchingNumbers = detectMatchNumbers(winningNumbers, selectedNumbers);
    for (let j = 0; j < matchingNumbers.length; j++) {
      cards[i + j + 1] += cards[i];
    }
  }

  return cards.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);
}
