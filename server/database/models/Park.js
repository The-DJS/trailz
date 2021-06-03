const mongoose = require('mongoose');

const parkSchema = mongoose.Schema({
  parkId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    require: true,
  },
  address: {
    type: String,
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  icon: {
    type: String,
    // require: true,
  },
  imageUrl: {
    type: String,
    // required: true,
  },
  anchorTag: {
    type: String,
    // required: true,
  },
});

module.exports = mongoose.model('Park', parkSchema);
