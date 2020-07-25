import { rollDie } from '../../../utils';

export default function unimechanikaRoller(n: number, type: number = 1): string
{
  return type === 1 ? rollV1(n) : rollV2(n);
}

function rollV1(n: number): string
{
  const outcomes = ['Porażka', 'Słaby sukces', 'Sukces', 'Mocny sukces', 'Krytyczny sukces'];
  const score = (rolled: number) => {
    if (rolled === 10) return 2;
    if (rolled >= 7) return 1;
    return 0;
  }

  const rolls = [];
  if (n === 0) {
    rolls.push(Math.min(score(rollDie(10)), score(rollDie(10))));
  } else {
    for (let i = 0; i < n; i++) {
      rolls.push(rollDie(10));
    }
  }

  const result = rolls.reduce((pv, cv) => pv += score(cv), 0);

  return `${n}dUni1: **${result}**p - ${outcomes[result > 4 ? 4 : result]} [${rolls.join(', ')}]`;

}

function rollV2(n: number): string
{
  let rolls = [];
  for (let i = 0; i < (n === 0 ? 2 : n); i++) {
    rolls.push(rollDie(10));
  }
  rolls = rolls.sort((a, b) => b - a);
  if (n === 0) rolls = [rolls[1]];

  let outcome;
  if (n > 1 && rolls[1] === 10) {
    outcome = 'Krytyczny sukces';
  } else if (rolls[0] === 10) {
    outcome = 'Mocny sukces';
  } else if (rolls[0] >= 8) {
    outcome = 'Sukces';
  } else if (rolls[0] >= 5) {
    outcome = 'Komplikacje';
  } else {
    outcome = 'Porażka';
  }

  return `${n}dUni2: **${outcome}** [${rolls.join(', ')}]`;
}
