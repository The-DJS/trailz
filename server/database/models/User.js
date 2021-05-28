const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  favoriteParks: [{ type: mongoose.Schema.Types.ObjectId, default: [] }],
});

userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);
