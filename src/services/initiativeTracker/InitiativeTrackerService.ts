import { ServiceInterface } from '../ServiceInterface';

export default class InitiativeTrackerService implements ServiceInterface {

  public getTrigger(): string
  {
    return ', ';
  }

  public execute(command: string): string
  {
    throw new Error('Method not implemented.');
  }

  public usage(): string
  {
    throw new Error('Method not implemented.');
  }
}
