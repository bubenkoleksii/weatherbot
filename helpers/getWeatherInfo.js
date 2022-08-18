const JsSoup = require('jssoup').default;

const getWeatherNow = (html) => {
  const soup = new JsSoup(html);
  
  const time = soup.findAll('td', 'cur')[0].contents[0]._text.replace(' ', '');
  const img = soup.findAll('div', 'img')[0].findAll('img')[0].attrs.src;
  const temperature = soup.findAll('td', 'cur')[2].contents[0]._text.replace('&deg;', '°') + ' C';
  const temperatureSens = soup.findAll('td', 'cur')[3].contents[0]._text.replace('&deg;', '°') + ' C';
  const pressure = soup.findAll('td', 'cur')[4].contents[0]._text + ' мм';
  const humidity = soup.findAll('td', 'cur')[5].contents[0]._text + '%';
  const wind = soup.findAll('td', 'cur')[6].findAll('div', 'Tooltip')[0].attrs['data-tooltip'];
  
  return {
    time,
    img,
    temperature,
    temperatureSens,
    pressure,
    humidity,
    wind
  };
}

const getWeatherInfoOnDay = (html) => {
  const soup = new JsSoup(html);
  
  const minTemperature = soup.findAll('div', 'min')[0].findAll('span')[0].contents[0]._text.replace('&deg;', '°') + ' C';
  const maxTemperature = soup.findAll('div', 'max')[0].findAll('span')[0].contents[0]._text.replace('&deg;', '°') + ' C';
  const sunriseDate = soup.findAll('div', 'infoDaylight')[0].findAll('span')[0].contents[0]._text;
  const sunsetDate = soup.findAll('div', 'infoDaylight')[0].findAll('span')[1].contents[0]._text;
  
  const descriptions = {};
  const descTags = soup.findAll('div', 'rSide');
  if (descTags.length === 4) {
   descriptions.description = descTags[2].find('div', 'description').contents[1]._text.replace(/&#039;/g, `'`).replace(/&quot;/g, '"');
   descriptions.nationalDescription = descTags[3].find('div', 'description').contents[1]._text.replace(/&#039;/g, `'`).replace(/&quot;/g, '"');
   
   const warningsTags = descTags[1].findAll('div', 'description');
   let warnings = [];
   warningsTags.forEach((item) => {
     const warning = item.contents[0]._text.replace(/&#039;/g, `'`);
     warnings.push(warning);
   });
   
   descriptions.warnings = warnings;
  }
  if (descTags.length === 3) {
    descriptions.description = descTags[1].find('div', 'description').contents[1]._text.replace(/&#039;/g, `'`).replace(/&quot;/g, '"');
    descriptions.nationalDescription = descTags[2].find('div', 'description').contents[1]._text.replace(/&#039;/g, `'`).replace(/&quot;/g, '"');
  }
  
  const maxInHistory = soup.findAll('p', 'infoHistoryval')[0].findAll('span')[0].contents[0]._text.replace('&deg;', '°') + ' C';
  const yearMaxInHistory = soup.findAll('p', 'infoHistoryval')[0].contents[3]._text.replace(/[()]/g, '').trim();
  const minInHistory = soup.findAll('p', 'infoHistoryval')[0].findAll('span')[1].contents[0]._text.replace('&deg;', '°') + ' C';
  const yearMinInHistory = soup.findAll('p', 'infoHistoryval')[0].contents[8]._text.replace(/[()]/g, '').trim();
  
  const times = soup.findAll('tr', 'gray')[0].findAll('td', /p[1-8]/);
  const temperatures = soup.findAll('tr', 'temperature')[0].findAll('td', /p[1-8]/);
  const temperaturesSens = soup.findAll('tr', 'temperatureSens')[0].findAll('td', /p[1-8]/);
  const pressures = soup.findAll('tr', 'gray')[1].findAll('td', /p[1-8]/);
  const humidities = soup.findAll('tr', 'gray')[1].nextSibling.findAll('td', /p[1-8]/);
  const winds = soup.findAll('tr', 'gray')[2].findAll('td', /p[1-8]/);
  const precipitations = soup.findAll('tr', 'gray')[2].nextSibling.findAll('td', /p[1-8]/);
  
  let tempWholeDayArray = [];
  for (let i = 0; i < temperatures.length; i++) {
    const temperature = temperatures[i].contents[0]._text.replace('&deg;', '°') + ' C';
    const temperatureSens = temperaturesSens[i].contents[0]._text.replace('&deg;', '°') + ' C';
    const time = times[i].contents[0]._text.replace(' ', '');
    const pressure = pressures[i].contents[0]._text + ' мм';
    const humidity = humidities[i].contents[0]._text + '%';
    const wind = winds[i].findAll('div', 'Tooltip')[0].attrs['data-tooltip'];
    let precipitation = precipitations[i].contents[0]._text;
    
    if (precipitation !== '-')
      precipitation += '%';
    
    tempWholeDayArray.push({
      temperature,
      time,
      temperatureSens,
      pressure,
      humidity,
      wind,
      precipitation
    });
  }
  
  return {
    minTemperature,
    maxTemperature,
    sunriseDate,
    sunsetDate,
    history: {
      maxInHistory,
      yearMaxInHistory,
      minInHistory,
      yearMinInHistory
    },
    descriptions,
    tempWholeDayArray
  };
}

module.exports = {getWeatherInfoOnDay, getWeatherNow}