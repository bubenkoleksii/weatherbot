const getWeatherString = (weather) => {
  let result = `<b>❄ Мінімальна температура:</b> ${weather.minTemperature}\n<b>🔥 Максимальна температура:</b> ${weather.maxTemperature}\n`;
  
  if (weather.descriptions) {
    if (weather.descriptions.warnings) {
      result += `\n<b>Попередження:</b>`;
      
      weather.descriptions.warnings.forEach((item) => {
        result += `\n\t\t\t${item}`;
      });
      
      result += `\n`;
    }

    result += `\n📝 <i>${weather.descriptions.description}</i>`;
  }
  
  weather.tempWholeDayArray.forEach((item) => {
    result += `\n\n<u>Погода о <b>${item.time}</b>:</u>`;
    result += `\n\t\t\t🌡️ <i>Температура:</i> ${item.temperature}, відчувається як ${item.temperatureSens}`;
    result += `\n\t\t\t⏲ <i>Тиск:</i> ${item.pressure}`;
    result += `\n\t\t\t💧 <i>Вологість:</i> ${item.humidity}`;
    result += `\n\t\t\t🌬️ <i>Вітер:</i> ${item.wind}`;
    result += `\n\t\t\t💦 <i>Ймовірність опадів:</i> ${item.precipitation}`;
  });
  
  if (weather.descriptions.nationalDescription)
    result += `\n\n🇺🇦 <b>Народний прогноз погоди: </b>${weather.descriptions.nationalDescription.slice(1)}`;
  
  result += `\n\n<b>🌅 Схід сонця:</b> ${weather.sunriseDate}`;
  result += `\n<b>🌆 Зaхід сонця:</b> ${weather.sunsetDate}`;
  
  result += `\n\n<b>🔥 Найвища температура за останні 130 років:</b> ${weather.history.maxInHistory}  (${weather.history.yearMaxInHistory})`;
  result += `\n<b>❄ Найнижча температура за останні 130 років:</b> ${weather.history.minInHistory}  (${weather.history.yearMinInHistory})`;
  return result;
}

module.exports = {getWeatherString}