import Discord from 'discord.js';
import { Logger } from 'winston';


export function setErrorHandling(client: Discord.Client, logger: Logger) {
  const handleError = (err: Error) => {
    const origin = typeof err.stack === 'undefined'
    ? 'undefined'
    : err.stack.slice(
        err.stack.indexOf('(') + 1,
        err.stack.indexOf(')')
      );

    logger.error(err.message, { type: err.name, origin });
    console.log(err.stack);

    logger.end();
  };

  process
    .on('unhandledRejection', (err: Error) => {
      handleError(err);
    })
    .on('uncaughtException', async (err: Error) => {
      await handleError(err);
    })
    .on('exit', () => {
      console.log('>>>');

      client.destroy();
    })
    .on('SIGINT', () => {
      console.log('<<<');

      logger.info('SIGINT');
    });

  client.on('error', function (err) {
    handleError(err);
  });
}
