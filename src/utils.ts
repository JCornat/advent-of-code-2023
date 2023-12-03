import * as fs from 'node:fs/promises';
import * as path from 'node:path';

export async function readLines(filename: string): Promise<string[]> {
  const filePath = path.join(__dirname, '..', 'data', filename);
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return fileContent.split('\n')
    .filter((line) => {
      return line.length > 0;
    });
}
