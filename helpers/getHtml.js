const axios = require('axios');

const URL = `https://ua.sinoptik.ua/%D0%BF%D0%BE%D0%B3%D0%BE%D0%B4%D0%B0-%D0%BC%D0%B0%D0%B9%D0%B4%D0%B0%D0%BD-303014685/`;

const getHtml = async (date = "") => {
  try {
    const response = await axios.get(URL + date);
  
    if (!response.data)
      return null;
  
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

module.exports = {getHtml};