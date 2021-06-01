const express = require('express');
const passport = require('passport');
const { auth } = require('../controllers');

const { Router } = express;
const router = Router();

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/google/callback', passport.authenticate('google'), auth.loggedIn);
router.get('/google/logout', auth.loggedOut, (req, res) => {
  res.redirect('/');
});
router.get('/user/:googleId', auth.getCurrentUser);

module.exports = router;
