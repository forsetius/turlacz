import { rollDie } from '../../../utils';

export default function numberedRoller(n: number, type?: number): string
{
  if (typeof type === 'undefined') {
    throw new Error('Die type must be a number');
  }

  const rolls = [];
  for (let i = 0; i < n; i++) {
    rolls.push(rollDie(type));
  }
  const result = rolls.reduce((pv, cv) => pv += cv, 0);

  return `${n}d${type}: **${result}** [${rolls.join(', ')}]`;
}
