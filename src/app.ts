import Discord from 'discord.js';
import { Bot } from './Bot';
import { setErrorHandling } from './errorHandler';
import { setupLogger } from './logger';
import { AppError } from './errors/AppError';

require('dotenv').config();
const logger = setupLogger()

const bot = new Bot();
const client = new Discord.Client();

setErrorHandling(client, logger);

client.on('ready', () => {
  const name = client.user === null ? 'Turlacz' : client.user.username;
  logger.info(`Zalogowano jako ${name}!`)
  throw new AppError('Test');
});


client.on('message', msg => {
  const request = bot.parse(msg.content);

  if (request !== null) {
    try {
      const response = bot.respond(request.trigger, request.command);

      msg.channel.send(`<@${msg.author.id}> ${response}`);
    } catch (err) {
      if (!(err instanceof AppError && err.isUserSafe)) {
        msg.channel.send('Bzzzt, bzzt! Tragiczny błąd, Turlacz umiera!');

        throw err;
      }

      const channelName = msg.channel instanceof Discord.DMChannel
        ? `DM channel of ${msg.author.username}`
        : `${msg.channel.guild.name}/${msg.channel.name}`;


      logger.warn(err.message, { user: msg.author.username, channel: channelName, request: msg.cleanContent });
      msg.channel.send(`<@${msg.author.id}> ${err.message}`);
    }
  }
});

client.login(process.env.TOKEN);
