const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  locationName: {
    type: String,
    required: true,
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
  time: {
    type: Date,
    required: true,
  },
  activity: {
    type: String,
    required: true,
    enum: ['Hiking', 'Fishing', 'Biking', 'Camping', 'Running', 'Other'],
  },
  description: {
    type: String,
    required: true,
  },
  isPublic: {
    type: Boolean,
    required: true,
  },
  attendees: [
    { type: mongoose.Schema.Types.ObjectId, required: true, default: [] },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model('Event', eventSchema);
