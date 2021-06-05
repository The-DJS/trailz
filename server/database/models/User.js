const mongoose = require('mongoose');
/**
 * find or create is an npm package. it checks to see if
 * the user exists in the database. if it doesn't, it saves
 * the user to the database.
 */
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
  /**
   * arrays that contain object ids
   * looks like a string in the console but is of type object id
   * have to convert to string with to string method to compare
   */
  favoriteParks: [{ type: mongoose.Schema.Types.ObjectId, default: [] }],
  createdEvents: [{ type: mongoose.Schema.Types.ObjectId, default: [] }],
  registeredEvents: [{ type: mongoose.Schema.Types.ObjectId, default: [] }],
});

/**
 * make sure to add the plugin. this adds a static method to the schema.
 */
userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);
