const {Markup: Options} = require('telegraf');

const markup = Options.keyboard([
  [Options.button.callback('Зараз', 'Now'), Options.button.callback('Сьогодні', 'Today')],
  [Options.button.callback('Завтра', 'Tomorrow'), Options.button.callback('3 дні', '3days')],
  [Options.button.callback('7 днів', '7days'), Options.button.callback('10 днів', '10days')],
]).resize();

const nowDateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
const dayDateOptions = { weekday: 'long', month: 'long', day: 'numeric' };

module.exports = {markup, nowDateOptions, dayDateOptions}