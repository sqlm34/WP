const config = require('./config');
const mongoose = require('mongoose');

function dbConnection() {
  mongoose
    .connect(config.MONGO_URL)
    .then(() => {
      console.log('Mongo connection OK...');
    })
    .catch((err) => console.log(err));
}

module.exports = dbConnection;
