import * as Utils from './utils';

async function init() {
  const lines = await Utils.readLines('day-01.txt');
  let part1 = 0;
  let part2 = 0;
  for (const line of lines) {
    const numbers = extractNumbers(line);
    const combinedNumbers = combineNumbers(numbers);
    part1 += combinedNumbers;

    const numbers2 = extractNumbers2(line);
    const combinedNumbers2 = combineNumbers(numbers2);
    part2 += combinedNumbers2;
  }

  console.log(`Part 1 : ${part1}`);
  console.log(`Part 2 : ${part2}`);
}

function extractNumbers(line: string) {
  const res: number[] = [];
  for (let i = 0; i < line.length; i++) {
    const character = line[i];
    const characterAsNumber = +character;
    if (isNaN(characterAsNumber)) {
      continue;
    }

    res.push(characterAsNumber);
  }

  return res;
}

function combineNumbers(numbers: number[]) {
  return (numbers[0] * 10) + numbers[numbers.length - 1];
}

function extractNumbers2(line: string) {
  const res: number[] = [];
  const litteralNumbers = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];

  for (let i = 0; i < line.length; i++) {
    const character = line[i];
    const characterAsNumber = +character;
    if (isNaN(characterAsNumber)) {
      for (let j = 0; j < litteralNumbers.length; j++) {
        const litteralNumber = litteralNumbers[j];
        const index = line.indexOf(litteralNumber, i);
        if (index !== i) {
          continue;
        }

        res.push(j + 1);
        break;
      }

      continue;
    }

    res.push(characterAsNumber);
  }

  return res;
}

init()
  .catch(console.error);
