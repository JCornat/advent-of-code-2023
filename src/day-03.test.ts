import { describe, expect, it } from 'vitest';
import { detectNumberCellsAround, extractNumbers, hasSymbolAround, isSymbol, solvePart1, solvePart2 } from './day-03';
import * as Utils from './utils';

describe('isSymbol', () => {
  it('Can detect symbol', () => {
    const value = isSymbol('+');
    expect(value).toEqual(true);
  });

  it('Can detect number', () => {
    const value = isSymbol('1');
    expect(value).toEqual(false);
  });

  it('Can detect point', () => {
    const value = isSymbol('.');
    expect(value).toEqual(false);
  });
});

describe('hasSymbolAround', () => {
  it('Can detect symbol around', () => {
    const lines = [
      `.....`,
      `.1...`,
      `.....`,
      `.....`,
    ];

    const value = hasSymbolAround({ lines, i: 1, j: 1 });
    expect(value).toEqual(false);
  });

  it('Can detect symbol around 2', () => {
    const lines = [
      `*....`,
      `.1...`,
      `.....`,
      `.....`,
    ];

    const value = hasSymbolAround({ lines, i: 1, j: 1 });
    expect(value).toEqual(true);
  });

  it('Can detect symbol around', () => {
    const lines = [
      `.*...`,
      `.1...`,
      `.....`,
      `.....`,
    ];

    const value = hasSymbolAround({ lines, i: 1, j: 1 });
    expect(value).toEqual(true);
  });

  it('Can detect symbol around', () => {
    const lines = [
      `..*..`,
      `.1...`,
      `.....`,
      `.....`,
    ];

    const value = hasSymbolAround({ lines, i: 1, j: 1 });
    expect(value).toEqual(true);
  });

  it('Can detect symbol around', () => {
    const lines = [
      `.....`,
      `.1*..`,
      `.....`,
      `.....`,
    ];

    const value = hasSymbolAround({ lines, i: 1, j: 1 });
    expect(value).toEqual(true);
  });

  it('Can detect symbol around', () => {
    const lines = [
      `.....`,
      `.1...`,
      `..*..`,
      `.....`,
    ];

    const value = hasSymbolAround({ lines, i: 1, j: 1 });
    expect(value).toEqual(true);
  });

  it('Can detect symbol around', () => {
    const lines = [
      `.....`,
      `.1...`,
      `.*...`,
      `.....`,
    ];

    const value = hasSymbolAround({ lines, i: 1, j: 1 });
    expect(value).toEqual(true);
  });

  it('Can detect symbol around', () => {
    const lines = [
      `.....`,
      `.1...`,
      `*....`,
      `.....`,
    ];

    const value = hasSymbolAround({ lines, i: 1, j: 1 });
    expect(value).toEqual(true);
  });

  it('Can detect symbol around', () => {
    const lines = [
      `.....`,
      `*1...`,
      `.....`,
      `.....`,
    ];

    const value = hasSymbolAround({ lines, i: 1, j: 1 });
    expect(value).toEqual(true);
  });
});

describe('solvePart1', () => {
  it('Can detect symbol around', () => {
    const lines = [
      '467..114..',
      '...*......',
      '..35..633.',
      '......#...',
    ];

    const value = solvePart1(lines);
    expect(value).toEqual(467 + 35 + 633);
  });

  it('Can detect symbol around', () => {
    const lines = [
      '467....114',
      '...*......',
      '..35..633.',
      '......#...',
    ];

    const value = solvePart1(lines);
    expect(value).toEqual(467 + 35 + 633);
  });

  it('Can detect symbol around', () => {
    const lines = [
      '467.......',
      '...*...114',
      '..35..633.',
      '......#...',
    ];

    const value = solvePart1(lines);
    expect(value).toEqual(467 + 35 + 633);
  });

  it('Can detect symbol around', () => {
    const lines = [
      '467.......',
      '....*..114',
      '..35..633.',
      '......#...',
    ];

    const value = solvePart1(lines);
    expect(value).toEqual(35 + 633);
  });

  it('Can detect symbol around', () => {
    const lines = [
      '467.......',
      '....*..114',
      '..35..633.',
      '..........',
      '.......114',
    ];

    const value = solvePart1(lines);
    expect(value).toEqual(35);
  });

  it('Can detect symbol around', () => {
    const lines = [
      '.........*',
      '.........*',
      '.......114',
      '..........',
    ];

    const value = solvePart1(lines);
    expect(value).toEqual(114);
  });

  it('Can detect symbol around', () => {
    const lines = [
      '467..114..',
      '...*......',
      '..35..633.',
      '......#...',
      '617*......',
      '.....+.58.',
      '..592.....',
      '......755.',
      '...$.*....',
      '.664.598..',
    ];

    const value = solvePart1(lines);
    expect(value).toEqual(4361);
  });
});

describe('detectNumbersAround', () => {
  it('Can detect symbol around', () => {
    const lines = [
      '.....114..',
      '...*......',
      '...5..633.',
      '......#...',
    ];

    const value = detectNumberCellsAround({ lines, i: 1, j: 3 });
    expect(value).toEqual([[2, 3]]);
  });

  it('Can detect symbol around', () => {
    const lines = [
      '467..114..',
      '...*......',
      '..35..633.',
      '......#...',
    ];

    const value = detectNumberCellsAround({ lines, i: 1, j: 3 });
    expect(value).toEqual([[0, 2], [2, 2], [2, 3]]);
  });
});

describe('extractNumbersOnLine', () => {
  it('Can detect symbol around', () => {
    const line = '...5..633.';

    const value = Utils.extractNumbers(line);
    expect(value).toEqual([{ value: 5, index: 3 }, { value: 633, index: 6 }]);
  });

  it('Can detect symbol around', () => {
    const line = '........';

    const value = Utils.extractNumbers(line);
    expect(value).toEqual([]);
  });
});

describe('extractNumbers', () => {
  it('Can detect symbol around', () => {
    const lines = [
      '.....114..',
      '...*......',
      '...5..633.',
      '......#...',
    ];

    const extractedNumbersAllLines = [];
    for (const line of lines) {
      const numbers = Utils.extractNumbers(line);
      extractedNumbersAllLines.push(numbers);
    }

    const value = extractNumbers({ extractedNumbersAllLines, cells: [[2, 3]] });
    expect(value).toEqual([5]);
  });

  it('Can detect symbol around', () => {
    const lines = [
      '....114..',
      '...*......',
      '...5..633.',
      '......#...',
    ];

    const extractedNumbersAllLines = [];
    for (const line of lines) {
      const numbers = Utils.extractNumbers(line);
      extractedNumbersAllLines.push(numbers);
    }

    const value = extractNumbers({ extractedNumbersAllLines, cells: [[0, 4], [2, 3]] });
    expect(value).toEqual([114, 5]);
  });
});

describe('solvePart2', () => {
  it('Can detect symbol around', () => {
    const lines = [
      '467..114..',
      '...*......',
      '..35..633.',
      '......#...',
    ];

    const value = solvePart2(lines);
    expect(value).toEqual(467 * 35);
  });

  it('Can detect symbol around', () => {
    const lines = [
      '467.114..',
      '...*......',
      '..35..633.',
      '......#...',
    ];

    const value = solvePart2(lines);
    expect(value).toEqual(0);
  });

  it('Can detect symbol around', () => {
    const lines = [
      '467.114..',
      '...*......',
      '......633.',
      '......#...',
    ];

    const value = solvePart2(lines);
    expect(value).toEqual(467 * 114);
  });

  it('Can detect symbol around', () => {
    const lines = [
      '467......',
      '...*......',
      '......633.',
      '......#...',
    ];

    const value = solvePart2(lines);
    expect(value).toEqual(0);
  });

  it('Can detect symbol around', () => {
    const lines = [
      '*467.......',
      '2........',
      '......633.',
      '......#...',
    ];

    const value = solvePart2(lines);
    expect(value).toEqual(2 * 467);
  });

  it('Can detect symbol around', () => {
    const lines = [
      '*467.......',
      '.2........',
      '......633.',
      '......#...',
    ];

    const value = solvePart2(lines);
    expect(value).toEqual(2 * 467);
  });

  it('Can detect symbol around', () => {
    const lines = [
      '.467.......',
      '.2*.......',
      '......633.',
      '......#...',
    ];

    const value = solvePart2(lines);
    expect(value).toEqual(2 * 467);
  });

  it('Can detect symbol around', () => {
    const lines = [
      '.467111....',
      '....*.....',
      '...2..633.',
      '......#...',
    ];

    const value = solvePart2(lines);
    expect(value).toEqual(2 * 467111);
  });

  it('Can detect symbol around', () => {
    const lines = [
      '.467111....',
      '....*.....',
      '...2633.',
      '......#...',
    ];

    const value = solvePart2(lines);
    expect(value).toEqual(2633 * 467111);
  });

  it('Can detect symbol around', () => {
    const lines = [
      '.467111....',
      '....*.....',
      '...2633.',
      '......#...',
    ];

    const value = solvePart2(lines);
    expect(value).toEqual(2633 * 467111);
  });

  it('Can detect symbol around 33333', () => {
    const lines = [
      '.....467111',
      '....*.....',
      '.....2633',
      '......#...',
    ];

    const value = solvePart2(lines);
    expect(value).toEqual(2633 * 467111);
  });
});
