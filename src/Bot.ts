import { globRequire } from './utils';
import { ServiceInterface, ServiceCtor } from './services/ServiceInterface';
import { Default } from './types';
import { NoServiceForTriggerError } from './errors/NoServiceForTriggerError';

export class Bot {

  private services: Map<string, ServiceInterface> = new Map();

  public constructor()
  {
    const serviceFiles = globRequire('services/*/*Service.?s');
    serviceFiles.forEach(
      (file: Default<ServiceCtor>) => {
        const service = new file.default();

        this.services.set(service.getTrigger(), service);
      }
    );
  }

  public parse(message: string): {trigger: string, command: string} | null
  {
    const trigger =  Array.from(this.services.keys())
                          .find((el: string) => message.startsWith(el));

    if (typeof trigger === 'undefined') {
      return null;
    }

    const command = message.slice(trigger.length);
    return { trigger, command };
  }

  public respond(trigger: string, command: string)
  {
    const service = this.services.get(trigger);
    if (typeof service === 'undefined') {
      throw new NoServiceForTriggerError(trigger);
    }

    return service.execute(command);
  }
}
