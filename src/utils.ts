import * as fs from 'node:fs/promises';
import * as path from 'node:path';

export async function readLines(filename: string): Promise<string[]> {
  const filePath = path.join(__dirname, '..', 'data', filename);
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return convertStringMultilineToStringArray(fileContent);
}

export function convertStringMultilineToStringArray(content: string): string[] {
  return content.split('\n')
    .filter((line) => {
      return line.length > 0;
    });
}

export function isNumber(value: string): boolean {
  return !isNaN(value);
}

export function isNaN<T>(arg: T): boolean {
  if (typeof arg === 'undefined') {
    return true;
  } else if (typeof arg === 'string') {
    const tmp = arg.trim();
    if (tmp === '') {
      return true;
    }

    return Number.isNaN(+tmp);
  } else if (typeof arg === 'number') {
    return Number.isNaN(arg);
  } else if (typeof arg === 'boolean') {
    return true;
  } else if (Array.isArray(arg)) {
    return true;
  } else if (arg instanceof Date) {
    return true;
  } else if (arg && typeof arg === 'object') {
    return true;
  } else if (arg === null) {
    return true;
  } else {
    console.error('Argument type unexpected', arg, typeof arg);
    throw new Error('Argument type unexpected');
  }
}

export interface ExtractedNumber {
  value: number;
  index: number;
}

export function extractNumbers(line: string): ExtractedNumber[] {
  const res: ExtractedNumber[] = [];
  let initialIndex = NaN;
  let currentNumber = '';

  function addElement(value: number, index: number): void {
    const element = {
      value,
      index,
    };

    res.push(element);
  }

  for (let i = 0; i < line.length; i++) {
    const character = line[i];
    if (isNumber(character)) {
      if (isNaN(initialIndex)) {
        initialIndex = i;
      }

      currentNumber += character;

      if (i === line.length - 1) { // If last character is a number
        addElement(+currentNumber, initialIndex);
      }

      continue;
    }

    if (currentNumber) {
      addElement(+currentNumber, initialIndex);
      initialIndex = NaN;
      currentNumber = '';
    }
  }

  return res;
}
