import { describe, expect, it } from 'vitest';
import { hasSymbolAround, isSymbol, solvePart1 } from './day-03';

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

  it('Can detect symbol around', () => {
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
