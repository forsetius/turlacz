import Discord from 'discord.js';
import { final, Logger } from 'pino';


export function setErrorHandling(client: Discord.Client, logger: Logger) {
  const handleFinalError = (msg: string) => final(logger, (err, finalLogger) => {
    finalLogger.error(err, msg);
    process.exit();
  });

  process
    .on('unhandledRejection', handleFinalError('unhandledRejection'))
    .on('uncaughtException', handleFinalError('uncaughtException'))
    .on('SIGINT', () => {
      logger.info('Wciśnięto ctrl+c');
      process.exit();
    })
    .on('exit', () => {
      client.destroy();
      logger.fatal('Turlacz kończy pracę');
    });

  client.on('error', handleFinalError('clientError'));
}
