require('dotenv').config();
const axios = require('axios');

const getHtml = async (date = "") => {
  try {
    const response = await axios.get(process.env.URL + date);
  
    if (!response.data)
      return null;
  
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

module.exports = {getHtml};