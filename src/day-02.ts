import * as Utils from './utils';

init()
  .catch(console.error);

async function init() {
  const lines = await Utils.readLines('day-02.txt');
  let part1 = 0;
  let part2 = 0;

  for (const line of lines) {
    const parsedLine = parseLine(line);
    const isPossible = computePossibility(parsedLine);
    if (isPossible) {
      part1 += parsedLine.id;
    }

    const minimum = calculateMinimum(parsedLine);
    part2 += minimum;
  }

  console.log(`Part 1 : ${part1}`);
  console.log(`Part 2 : ${part2}`);
}

function parseLine(line: string) {
  const colonSplit = line.split(': ');
  const id = +(/Game (\d+)/.exec(colonSplit[0])?.[1]);
  const gamesSplit = colonSplit[1].split('; ');
  let red = 0;
  let green = 0;
  let blue = 0;
  for (const game of gamesSplit) {
    const parsedGame = parseGame(game);
    if (parsedGame.red > red) {
      red = parsedGame.red;
    }

    if (parsedGame.green > green) {
      green = parsedGame.green;
    }

    if (parsedGame.blue > blue) {
      blue = parsedGame.blue;
    }
  }

  return {
    id,
    red,
    green,
    blue,
  };
}

function parseGame(game: string) {
  const res = {
    red: 0,
    green: 0,
    blue: 0,
  };

  const cubes = game.split(', ');
  for (const cube of cubes) {
    const gameSplit = cube.split(' ');
    const quantity = +(gameSplit[0]);
    const color = gameSplit[1];
    const maxQuantity = res[color];
    if (quantity > maxQuantity) {
      res[color] = quantity;
    }
  }

  return res;
}

function computePossibility(parsedLine) {
  const cubes = {
    red: 12,
    green: 13,
    blue: 14,
  };

  if (parsedLine.red > cubes.red) {
    return false;
  }

  if (parsedLine.green > cubes.green) {
    return false;
  }

  if (parsedLine.blue > cubes.blue) {
    return false;
  }

  return true;
}

function calculateMinimum(parsedLine) {
  return parsedLine.red * parsedLine.green * parsedLine.blue;
}
