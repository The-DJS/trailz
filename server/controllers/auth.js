const { wrapAsync } = require('../helpers');
const { User } = require('../database');

const loggedIn = wrapAsync(async (req, res) => {
  const googleId = req.session.passport.user;
  const user = await User.findOne({ googleId });
  console.log(user);
  res.send(user);
});
const loggedOut = (req, res) => {
  req.logout();
  // res.redirect('https://accounts.google.com/logout');
  res.redirect('/');
};
const getCurrentUser = wrapAsync(async (req, res) => {
  const { googleId } = req.params;
  const user = await User.findOne({ googleId: googleId });
  console.log('sever sider user', user);
  res.send(user);
});
module.exports = { loggedIn, loggedOut, getCurrentUser };
