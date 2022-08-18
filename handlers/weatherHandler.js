const {getAll} = require('../helpers/fileHelper');
const {getHtml} = require("../helpers/getHtml");
const {getWeatherNow, getWeatherInfoOnDay} = require("../helpers/getWeatherInfo");
const {nowDateOptions, dayDateOptions} = require("../helpers/options");
const {getWeatherString} = require("../helpers/getWeatherString");

const currentDateString = (currentDate = new Date()) => {
  const currentMonth = currentDate.getMonth() + 1 < 10 ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1;
  
  return `${currentDate.getFullYear()}-${currentMonth}-${currentDate.getDate()}`;
}

class WeatherHandler {
  async sendAll(bot) {
    try {
      getAll(async users => {
        if (users.length !== 0) {
          const html = await getHtml( currentDateString() );
          const weatherInfo = getWeatherInfoOnDay(html);
          const weatherString = getWeatherString(weatherInfo);
      
          let result = `📅 <u>Погода сьогодні: <b>${new Date().toLocaleString('uk', dayDateOptions)}</b></u>`
          result += `\n\n${weatherString}`;
      
          for (const user of users) {
            await bot.telegram.sendMessage(user.chatId, result, {parse_mode: 'HTML'});
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
  
  async sendAllTomorrow(bot) {
    try {
      getAll(async users => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
  
        const html = await getHtml( currentDateString(tomorrow) );
        const weatherInfo = getWeatherInfoOnDay(html);
        const weatherString = getWeatherString(weatherInfo);
  
        let result = `📅 Погода завтра: <b>${tomorrow.toLocaleString('uk', dayDateOptions)}</b>`
        result += `\n\n${weatherString}`;
  
        for (const user of users) {
          await bot.telegram.sendMessage(user.chatId, result, {parse_mode: 'HTML'});
        }
      });
     
    } catch (e) {
      console.log(e)
    }
  }
  
  async now(ctx) {
    try {
      const html = await getHtml( currentDateString() );
  
      const weatherInfo = getWeatherNow(html);
  
      let result = `📅 Погода зараз: ${new Date().toLocaleString('uk', nowDateOptions)} на ${weatherInfo.time}
    \n🌡 Температура: ${weatherInfo.temperature}, відчувається як ${weatherInfo.temperatureSens}
    \n⏲ Тиск: ${weatherInfo.pressure}
    \n💧 Вологість: ${weatherInfo.humidity}
    \n🌬 Вітер: ${weatherInfo.wind}`;
  
      await ctx.replyWithPhoto({url: 'https:' + weatherInfo.img}, {caption: result});
    } catch (e) {
      console.log(e);
    }
  }
  
  async today(ctx) {
    try {
      const html = await getHtml( currentDateString() );
      const weatherInfo = getWeatherInfoOnDay(html);
      const weatherString = getWeatherString(weatherInfo);
  
      let result = `<u>Погода сьогодні: 📅<b>${new Date().toLocaleString('uk', dayDateOptions)}</b></u>`
      result += `\n\n${weatherString}`;
  
      await ctx.replyWithHTML(result);
    } catch (e) {
      console.log(e);
    }
  }
  
  async tomorrow(ctx) {
    try {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
  
      const html = await getHtml( currentDateString(tomorrow) );
      const weatherInfo = getWeatherInfoOnDay(html);
      const weatherString = getWeatherString(weatherInfo);
  
      let result = `📅 Погода завтра: <b>${tomorrow.toLocaleString('uk', dayDateOptions)}</b>`
      result += `\n\n${weatherString}`;
  
      await ctx.replyWithHTML(result);
    } catch (e) {
      console.log(e)
    }
  }
  
  async threeDays(ctx) {
    try {
      const today = new Date();
  
      for (let i = 0; i < 3; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
    
        const html = await getHtml( currentDateString(currentDate) );
        const weatherInfo = getWeatherInfoOnDay(html);
        const weatherString = getWeatherString(weatherInfo);
    
        let result = `📅 <u>Погода на: <b>${currentDate.toLocaleString('uk', dayDateOptions)}</b></u>`;
        result += `\n\n${weatherString}`;
    
        await ctx.replyWithHTML(result);
      }
    } catch (e) {
      console.log(e);
    }
  }
  
  async sevenDays(ctx) {
    try {
      const today = new Date();
  
      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
    
        const html = await getHtml( currentDateString(currentDate) );
        const weatherInfo = getWeatherInfoOnDay(html);
        const weatherString = getWeatherString(weatherInfo);
    
        let result = `<u>📅 Погода на: <b>${currentDate.toLocaleString('uk', dayDateOptions)}</b></u>`;
        result += `\n\n${weatherString}`;
    
        await ctx.replyWithHTML(result);
      }
    } catch (e) {
      console.log(e);
    }
  }
  
  async tenDays(ctx) {
    try {
      const today = new Date();
  
      for (let i = 0; i < 10; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
    
        const html = await getHtml( currentDateString(currentDate) );
        const weatherInfo = getWeatherInfoOnDay(html);
        const weatherString = getWeatherString(weatherInfo);
    
        let result = `📅 <u>Погода на: <b> ${currentDate.toLocaleString('uk', dayDateOptions)}</b></u>`;
        result += `\n\n${weatherString}`;
    
        await ctx.replyWithHTML(result);
      }
    } catch (e) {
     console.log(e);
    }
  }
}

module.exports = new WeatherHandler();