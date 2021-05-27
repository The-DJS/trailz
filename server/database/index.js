const mongoose = require('mongoose');

const name = 'trailzDb';
const url = `mongodb://localhost:27017/${name}`;

const database = mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('successfully connected to trailz database'))
  .catch((err) => {
    console.log('unsuccessfully connected to trailz database');
    console.log(err);
  });

module.exports = {
  database,
};
