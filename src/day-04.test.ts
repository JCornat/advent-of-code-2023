import { describe, expect, it } from 'vitest';
import { calculateScore, detectMatchNumbers, solvePart1, solvePart2 } from './day-04';

describe('matchingNumbers', () => {
  it('matchingNumbers', () => {
    const value = detectMatchNumbers([1, 2, 3], [1]);
    expect(value).toEqual([1]);
  });

  it('matchingNumbers', () => {
    const value = detectMatchNumbers([1, 2, 3], [4]);
    expect(value).toEqual([]);
  });

  it('matchingNumbers', () => {
    const value = detectMatchNumbers([1, 2, 3], [1, 2, 3]);
    expect(value).toEqual([1, 2, 3]);
  });
});

describe('calculateScore', () => {
  it('Test without number', () => {
    const value = calculateScore([]);
    expect(value).toEqual(0);
  });

  it('Test with 1 number', () => {
    const value = calculateScore([1]);
    expect(value).toEqual(1);
  });

  it('Test with 2 numbers', () => {
    const value = calculateScore([1, 2]);
    expect(value).toEqual(2);
  });

  it('Test with 3 numbers ', () => {
    const value = calculateScore([1, 2, 3]);
    expect(value).toEqual(4);
  });
});

describe('solvePart1', () => {
  it('solvePart1', () => {
    const lines = [
      'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53',
      'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19',
      'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1',
      'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83',
      'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36',
      'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11',
    ];

    const value = solvePart1(lines);
    expect(value).toEqual(13);
  });
});

describe('solvePart2', () => {
  it('solvePart2', () => {
    const lines = [
      'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53',
      'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19',
      'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1',
      'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83',
      'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36',
      'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11',
    ];

    const value = solvePart2(lines);
    expect(value).toEqual(30);
  });
});
