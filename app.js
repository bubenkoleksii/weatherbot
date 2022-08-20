require('dotenv').config();
const {Telegraf} = require('telegraf');
const cron = require('node-cron');

const {markup} = require('./helpers/options');
const weatherHandler = require('./handlers/weatherHandler');
const {addUser} = require('./helpers/addUser');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Bot start
bot.start(async (ctx) => {
  const chatId = ctx.message.chat.id;
  const userId = ctx.message.from.id;
  
  await addUser(chatId);
  
  let name = ctx.message.from.first_name;
  if (ctx.message.from.last_name)
    name += ` ${ctx.message.from.last_name}`
  
  const greeting = `Привіт, <b>${name}</b>!
    \nЯ допоможу тобі дізнатись погоду в селі Майдан🇺🇦!
    \nЯ показую погоду на прямо зараз, сьогодні, завтра, 3 дні, 7 днів та 10 днів.
    \nДля того, щоб обрати один із варіантів, просто натисни на одну із кнопок внизу екрану або обери одну з наступних команд:
    
    /start - Розпочати роботу з ботом
    /help - Допомога для робити з ботом
    /now - Погода прямо зараз
    /today - Погода сьогодні
    /tomorrow - Погода завтра
    /three - Погода на 3 дні
    /seven - Погода на 7 днів
    /ten - Погода на 10 днів
  `;
  
  if (chatId === userId)
    await ctx.replyWithHTML(greeting, markup);
  else
    await ctx.replyWithHTML(greeting);
});

// Bot help
bot.help(async (ctx) => {
  const chatId = ctx.message.chat.id;
  const userId = ctx.message.from.id;
  
  const helpString = `\nДля того, щоб обрати один із варіантів, просто натисни на одну із кнопок внизу екрану або обери одну з наступних команд:
  
    /start - Розпочати роботу з ботом
    /help - Допомога для робити з ботом
    /now - Погода прямо зараз
    /today - Погода сьогодні
    /tomorrow - Погода завтра
    /three - Погода на 3 дні
    /seven - Погода на 7 днів
    /ten - Погода на 10 днів
  `;
  
  if (chatId === userId)
    await ctx.replyWithHTML(helpString, markup);
  else
    await ctx.replyWithHTML(helpString);
});

// Weather now
bot.hears('Зараз', weatherHandler.now);
bot.command('now', weatherHandler.now);



// Weather today
bot.hears('Сьогодні', weatherHandler.today);
bot.command('today', weatherHandler.today);

// Weather tomorrow
bot.hears('Завтра', weatherHandler.tomorrow);
bot.command('tomorrow', weatherHandler.tomorrow);

// Weather on three days
bot.hears('3 дні', weatherHandler.threeDays);
bot.command('three', weatherHandler.threeDays);

// Weather on seven days
bot.hears('7 днів', weatherHandler.sevenDays);
bot.command('seven', weatherHandler.sevenDays);

// Weather on ten days
bot.hears('10 днів', weatherHandler.tenDays);
bot.command('ten', weatherHandler.tenDays);

// Start bot
bot.launch().catch(() => console.log('Error while bot is launching.'));

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
