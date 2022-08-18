const { readFile, writeFile } = require('fs');

const {usersPath} = require('../consts');

const getAll = callback => {
  readFile(usersPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    
    try {
      callback( JSON.parse(data) );
    } catch {
      callback([]);
    }
  });
}

const write = data => {
  writeFile(usersPath, JSON.stringify(data), {}, err => {
    if (err) {
      throw err;
    }
  });
}

module.exports = {write, getAll};