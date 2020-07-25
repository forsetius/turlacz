import { rollDie } from '../../../utils';

export default function fudgeRoller(n: number, type?: number): string
{
  const rolls = [];
  for (let i = 0; i < n; i++) {
    rolls.push(rollDie(3) - 2);
  }
  const result = rolls.reduce((pv, cv) => pv += cv, 0);

  return `${n}dF: ${result} ${rolls.join(', ')}]`;
}
