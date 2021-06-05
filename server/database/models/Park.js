const mongoose = require('mongoose');

const parkSchema = mongoose.Schema({
  parkId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
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
  },
  imageUrl: {
    type: String,
  },
  anchorTag: {
    type: String,
  },
});

module.exports = mongoose.model('Park', parkSchema);
