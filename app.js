require('dotenv').config();
const {Telegraf} = require('telegraf');
const cron = require('node-cron');

const {markup, helpString, getGreeting} = require('./helpers/options');
const weatherHandler = require('./handlers/weatherHandler');
const {addUser} = require('./helpers/addUser');

const bot = new Telegraf(process.env.BOT_TOKEN);

cron.schedule('59 6 * * *', async () => {
  await weatherHandler.sendAll(bot);
});

cron.schedule('59 18 * * *', async () => {
  await weatherHandler.sendAllTomorrow(bot);
});

bot.start(async (ctx) => {
  const chatId = ctx.message.chat.id;
  const userId = ctx.message.from.id;
  
  await addUser(chatId);
  
  let name = ctx.message.from.first_name;
  if (ctx.message.from.last_name)
    name += ` ${ctx.message.from.last_name}`
  
  const greeting = getGreeting(name);
  
  if (chatId === userId)
    await ctx.replyWithHTML(greeting, markup);
  else
    await ctx.replyWithHTML(greeting);
});

bot.help(async (ctx) => {
  const chatId = ctx.message.chat.id;
  const userId = ctx.message.from.id;
  
  if (chatId === userId)
    await ctx.replyWithHTML(helpString, markup);
  else
    await ctx.replyWithHTML(helpString);
});

bot.hears('Зараз', weatherHandler.now);
bot.command('now', weatherHandler.now);

bot.hears('Сьогодні', weatherHandler.today);
bot.command('today', weatherHandler.today);

bot.hears('Завтра', weatherHandler.tomorrow);
bot.command('tomorrow', weatherHandler.tomorrow);

bot.hears('3 дні', weatherHandler.threeDays);
bot.command('three', weatherHandler.threeDays);

bot.hears('7 днів', weatherHandler.sevenDays);
bot.command('seven', weatherHandler.sevenDays);

bot.hears('10 днів', weatherHandler.tenDays);
bot.command('ten', weatherHandler.tenDays);

bot.launch().catch(() => console.log('Error while bot is launching.'));

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))