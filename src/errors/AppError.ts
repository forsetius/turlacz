export class AppError extends Error {

  public readonly isUserSafe: boolean;

  public constructor(message: string, isUserSafe: boolean = false)
  {
    super(message);
    this.isUserSafe = isUserSafe;
    this.name = 'AppError';
  }
}
