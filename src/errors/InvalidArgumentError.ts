import { AppError } from './AppError';

export class InvalidArgumentError extends AppError {

  public constructor(message: string)
  {
    super(message, true);
    this.name = 'InvalidArgumentError';
  }
}
