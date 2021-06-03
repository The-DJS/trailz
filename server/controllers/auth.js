const { wrapAsync } = require('../helpers');
const { User } = require('../database');

const loggedIn = wrapAsync(async (req, res) => {
  const googleId = req.session.passport.user;
  const user = await User.findOne({ googleId });
  res.send(user);
});

const loggedOut = (req, res) => {
  req.logout();
  // res.redirect('https://accounts.google.com/logout');
  req.session.destroy();
  res.send(true);
};

const getCurrentUser = wrapAsync(async (req, res) => {
  const { googleId } = req.params;
  const user = await User.findOne({ googleId });
  if (!user) {
    return res.send(false);
  }
  console.log(user);
  res.send(user);
});

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
