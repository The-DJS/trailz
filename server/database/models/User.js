const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  favoriteParks: [{ type: mongoose.Schema.Types.ObjectId, default: [] }],
  createdEvents: [{ type: mongoose.Schema.Types.ObjectId, default: [] }],
  registeredEvents: [{ type: mongoose.Schema.Types.ObjectId, default: [] }],
});

userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);
