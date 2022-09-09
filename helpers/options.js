const {Markup} = require('telegraf');

const markup = Markup.keyboard([
  [Markup.button.callback('Зараз', 'Now'), Markup.button.callback('Сьогодні', 'Today')],
  [Markup.button.callback('Завтра', 'Tomorrow'), Markup.button.callback('3 дні', '3days')],
  [Markup.button.callback('7 днів', '7days'), Markup.button.callback('10 днів', '10days')],
]).resize();

const getGreeting = (name) => {
  return `Привіт, <b>${name}</b>!
    \nЯ допоможу тобі дізнатись погоду в селі Майдан🇺🇦!
    \nЯ показую погоду на прямо зараз, сьогодні, завтра, 3 дні, 7 днів та 10 днів.
    \nДля того, щоб обрати один із варіантів, просто натисни на одну із кнопок внизу екрану або обери одну з наступних команд:
    
    /start - Розпочати роботу з ботом
    /help - Допомога для роботи з ботом
    /now - Погода прямо зараз
    /today - Погода сьогодні
    /tomorrow - Погода завтра
    /three - Погода на 3 дні
    /seven - Погода на 7 днів
    /ten - Погода на 10 днів
  `;
}

const helpString = `\nДля того, щоб обрати один із варіантів, просто натисніть на одну із кнопок внизу екрану або оберіть одну з наступних команд:
    /start - Розпочати роботу з ботом
    /help - Допомога для роботи з ботом
    /now - Погода прямо зараз
    /today - Погода сьогодні
    /tomorrow - Погода завтра
    /three - Погода на 3 дні
    /seven - Погода на 7 днів
    /ten - Погода на 10 днів
  `;

const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };

module.exports = {markup, dateOptions, getGreeting, helpString}