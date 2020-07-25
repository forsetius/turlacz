import { rollDie } from '../../../utils';

export default function bladesRoller(n: number, type?: number): string
{
  let rolls = [];
  for (let i = 0; i < (n === 0 ? 2 : n); i++) {
    rolls.push(rollDie(6));
  }
  rolls = rolls.sort((a, b) => b - a);
  if (n === 0) rolls = [rolls[1]];

  let outcome;
  if (n > 1 && rolls[1] === 6) {
    outcome = 'Krytyczny sukces';
  } else if (rolls[0] === 6) {
    outcome = 'Sukces';
  } else if (rolls[0] >= 4) {
    outcome = 'Komplikacje';
  } else {
    outcome = 'Porażka';
  }

  return `${n}dBlades: **${outcome}** [${rolls.join(', ')}]`
}
