export interface ServiceInterface {
  getTrigger(): string;
  execute(command: string): string;
  usage(): string;
}

export interface ServiceCtor {
  new (): ServiceInterface;
}
