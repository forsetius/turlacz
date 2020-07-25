import { AppError } from './AppError';

export class NoServiceForTriggerError extends AppError {

  public constructor(message: string)
  {
    super(`No service for trigger "${message}"`);
    this.name = 'NoServiceForTriggerError';
  }
}
