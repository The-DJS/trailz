const loggedIn = (req, res) => {
  res.send('logged in');
};

const loggedOut = (req, res) => {
  req.logout();
  res.redirect('https://accounts.google.com/logout');
};

module.exports = { loggedIn, loggedOut };
