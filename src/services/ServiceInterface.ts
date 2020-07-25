export interface ServiceInterface {
  getTrigger(): string;
  execute(command: string): string;
}

export interface ServiceCtor {
  new (): ServiceInterface;
}
