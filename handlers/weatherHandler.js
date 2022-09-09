const {getAll} = require('../helpers/fileHelper');
const {getHtml} = require("../helpers/getHtml");
const {getWeatherNow, getWeatherInfoOnDay} = require("../helpers/getWeatherInfo");
const {dateOptions} = require("../helpers/options");
const {getWeatherString} = require("../helpers/getWeatherString");

const currentDateString = (currentDate = new Date()) => {
  const month = currentDate.getMonth() + 1 < 10 ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1;
  const day = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate();
  
  return `${currentDate.getFullYear()}-${month}-${day}`;
}

const getForOneDay = async (shift = 0, today = new Date()) => {
  const currentDate = new Date(today);
  currentDate.setDate(today.getDate() + shift);
  
  const html = await getHtml( currentDateString(currentDate) );
  const weatherInfo = getWeatherInfoOnDay(html);
  const weatherString = getWeatherString(weatherInfo);
  
  let result = `📅 <u>Погода на: <b>${currentDate.toLocaleString('uk', dateOptions)}</b></u>`;
  result += `\n\n${weatherString}`;
  
  return result;
}

class WeatherHandler {
  async sendAll(bot) {
    try {
      getAll(async users => {
        if (users.length !== 0) {
          const html = await getHtml( currentDateString() );
          const weatherInfo = getWeatherInfoOnDay(html);
          const weatherString = getWeatherString(weatherInfo);
      
          let result = `📅 <u>Погода сьогодні: <b>${new Date().toLocaleString('uk', dateOptions)}</b></u>`
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
  
        let result = `📅 Погода завтра: <b>${tomorrow.toLocaleString('uk', dateOptions)}</b>`
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
  
      let result = `📅 Погода зараз: ${new Date().toLocaleString('uk', dateOptions)} на ${weatherInfo.time}
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
      const result = await getForOneDay();
      
      await ctx.replyWithHTML(result);
    } catch (e) {
      console.log(e);
    }
  }
  
  async tomorrow(ctx) {
    try {
      const today = new Date();
      const result = await getForOneDay(1, today);
  
      await ctx.replyWithHTML(result);
    } catch (e) {
      console.log(e)
    }
  }
  
  async threeDays(ctx) {
    try {
      const today = new Date();
  
      for (let i = 0; i < 3; i++) {
       const result = await getForOneDay(i, today);
       
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
        const result = await getForOneDay(i, today);
    
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
        const result = await getForOneDay(i, today);
    
        await ctx.replyWithHTML(result);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new WeatherHandler();