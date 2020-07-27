import Discord from 'discord.js';
import { AppError } from './errors/AppError';
import { Bot } from './Bot';
import { setErrorHandling } from './errorHandler';
import { setupLogger } from './logger';

require('dotenv').config();
const logger = setupLogger();
logger.info('Turlacz startuje...');

const bot = new Bot();
const client = new Discord.Client();

setErrorHandling(client, logger);
client.on('ready', () => {
  const name = client.user === null ? 'Turlacz' : client.user.username;
  logger.info(`Zalogowano jako ${name}!`);
});


client.on('message', msg => {
  const request = bot.parse(msg.content);
  const channelName = msg.channel instanceof Discord.DMChannel
    ? `DM-${msg.author.username}`
    : `${msg.channel.guild.name.replace(' ', '_')} #${msg.channel.name}`;

  if (request !== null) {
    try {
      const response = bot.respond(request.trigger, request.command);

      logger.debug(`${msg.author.username} @${channelName}: "${msg.cleanContent}" => "${response}"`);
      msg.channel.send(`<@${msg.author.id}> ${response}`);
    } catch (err) {
      if (!(err instanceof AppError && err.isUserSafe)) {
        msg.channel.send('Bzzzt, bzzt! Tragiczny błąd, Turlacz umiera!');

        throw err;
      }

      logger.warn(err.message, { user: msg.author.username, channel: channelName, request: msg.cleanContent });
      msg.channel.send(`<@${msg.author.id}> ${err.message}`);
    }
  }
});

client.login(process.env.TOKEN);
