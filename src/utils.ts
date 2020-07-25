import * as path from 'path';
import { sync as glob } from 'glob';

export function globRequire(pattern: string): Map<string, any>
{
  const files: Map<string, any> = new Map();
  const dir = __dirname + '/' + pattern;

  for (const filename of glob(dir)) {
    let name = path.basename(filename)
    name = name.slice(0, name.indexOf('.'));

    files.set(name, require(filename));
  }

  return files;
}

export function rollDie(sides: number): number
{
  return Math.floor(Math.random() * sides) + 1;
}
