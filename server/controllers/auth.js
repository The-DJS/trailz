const { wrapAsync } = require('../helpers');
const { User } = require('../database');

/**
 * this function will run after the user is authenticated
 * by a google server. It extracts the google id from the session
 * object, queries the database for the user document associated
 * with that google id, and returns the user object
 */
const loggedIn = wrapAsync(async (req, res) => {
  const googleId = req.session.passport.user;
  const user = await User.findOne({ googleId });
  res.send(user);
});

/**
 * this function will run after the log out button is clicked.
 * the user is logged out locally. the user is not logged out
 * of their google account. it responds with true to indicate
 * that local log out was successful.
 */
const loggedOut = (req, res) => {
  req.logout();
  req.session.destroy(); // this line is unnecessary
  res.send(true);
};

/**
 * this function executes after the user is authenticated
 * by the google server. it queries the database for the
 * user on the google id. if the user has already been
 * saved to the database, it returns the user object. if the
 * user has not been saved to the database, it responds with
 * false.
 */
const getCurrentUser = wrapAsync(async (req, res) => {
  const { googleId } = req.params;
  const user = await User.findOne({ googleId });
  if (!user) {
    return res.send(false);
  }
  res.send(user);
});

/**
 * when the client invokes get current user, if the get current
 * user function responds with false, the following function
 * will execute. The function adds a document to the database
 * using the google id, first name, and last name provided by
 * the google server after the user is authenticated. it responds
 * with the user.
 */
const createUser = wrapAsync(async (req, res) => {
  const { googleId } = req.params;
  const { firstName, lastName } = req.body;
  const user = await new User({ googleId, firstName, lastName }).save();
  res.send(user);
});

module.exports = {
  loggedIn,
  loggedOut,
  getCurrentUser,
  createUser,
};
