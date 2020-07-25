import {createLogger, format, transports, Logger } from 'winston';

export function setupLogger(): Logger
{
  const logger = createLogger()

  logger
    .on('error', (err: Error) => {
      console.log(err);
    })
    .on('finish', () => {
      setImmediate(() => process.exit())
    })

  const timeFormat = { format: 'YYYY-MM-DD HH:mm:ss' };
  const defaults = {
    maxsize: 4 * 1024 * 1024,
    maxFiles: 10,
    tailable: true,
    zippedArchive: true,
    format: format.combine(
      format.timestamp(timeFormat),
      format.json()
    )
  };

  const onlyUserErrors = format((info, opts) => {
    if (info.userError) { return info; }
    return false;
  });

  logger.add(new transports.File(Object.assign({}, defaults, { filename: 'logs/combined.log' })));
  logger.add(new transports.File(Object.assign({}, defaults, { filename: 'logs/error.log', level: 'error' })));
  logger.add(new transports.File(Object.assign({}, defaults, {
    filename: 'logs/user.log',
    format: format.combine(
      onlyUserErrors(),
      format.timestamp(timeFormat),
      format.json()
    )
  })));

  logger.add(new transports.Console({
    level: 'info',
    format: format.combine(
      process.env.NODE_ENV === 'production' ? format.uncolorize() : format.colorize(),
      format.timestamp(timeFormat),
      format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    )
  }));

  return logger;
}
