const {getAll, write} = require('../helpers/fileHelper');

const addUser = async (chatId) => {
  try {
    if (chatId) {
      getAll (u => {
        const isExists = u.find( u => u.chatId === chatId);
      
        if (!isExists) {
          u.push({chatId});
          write(u);
        }
      });
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports = {addUser};