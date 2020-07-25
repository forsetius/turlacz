import { ServiceInterface } from '../ServiceInterface';
import { globRequire } from '../../utils';
import { Default } from '../../types';
import { InvalidArgumentError } from '../../errors/InvalidArgumentError';

export default class RollerService implements ServiceInterface {
  private rollers: Map<string, Function> = new Map();

  public constructor()
  {
    const rollerFiles = globRequire('services/roller/rollers/*Roller.?s');
    rollerFiles.forEach(
      (file: Default<RollerFn>, name: string) => {
        this.rollers.set(name.slice(0, -6), file.default);
      }
    );
  }

  public getTrigger(): string
  {
    return '. ';
  }

  public execute(command: string): string
  {
    const params = this.parseCommand(command);

    switch (params.dieType.toLowerCase()) {
      case '.': return this.rollers.get('numbered')!(params.n, 20);
      case '..': return this.rollers.get('numbered')!(params.n, 100);
      case 'b' : return this.rollers.get('blades')!(params.n);
      case 'f' : return this.rollers.get('fudge')!(params.n);
      case 'u' : return this.rollers.get('unimechanika')!(params.n, 2);
      default:
        const die = Number(params.dieType);
        if (Number.isNaN(die)) {
          throw new InvalidArgumentError(`Należy podać rodzaj kostek: \n - '.' (d20) \n - '..' (d100) \n - 'b' (Blades in the Dark) \n - 'f' (FUDGE) \n - 'u' (Unimechanika)\n - liczba ścianek. \n\nPodano: "${params.dieType}"`);
        }

        return this.rollers.get('numbered')!(params.n, die);
    }
  }

  private parseCommand(command: string) {
    const DEFAULT_NUMBER_OF_DICE = '1';

    const parts = command.trim().split(' ');
    if (!Array.isArray(parts)
      || parts.length < 1
      || parts.length > 3
    ) throw new Error();

    if (parts.length === 1) {
      parts.unshift(DEFAULT_NUMBER_OF_DICE);
    }

    if (parts.length === 2) {
      if (Number.isSafeInteger(Number(parts[0]))) {
        parts.unshift('Rzut');
      } else {
        parts.splice(1, 0, DEFAULT_NUMBER_OF_DICE);
      }
    }

    return { label: parts[0], n: Number(parts[1]), dieType: parts[2] };
  }
}

type RollerFn = (n: number, type?: number) => string;
