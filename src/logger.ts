import { format } from 'fecha';
import pino from 'pino';

export function setupLogger(): pino.Logger
{
  return pino({
    level: 'debug',
    timestamp: () => `,"time":"${format(new Date(), 'YYYY-MM-DD HH:mm:ss')}"`
  });
}
