const express = require('express');
const passport = require('passport');
const { auth } = require('../controllers');

const { Router } = express;
const router = Router();

/**
 * the login button triggers the following route. the user is directed to the google
 * login page so they can log in using their google account.
 */
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
/**
 * after the user successfully logs in, the user is redirected to the following route.
 * this route gets the user from the database or creates the user in the database
 * and sets a state value on the client side
 */
router.get('/google/callback', passport.authenticate('google'), auth.loggedIn);
router.get('/google/logout', auth.loggedOut); // destroys the session
router.get('/user/:googleId', auth.getCurrentUser);
router.post('/user/:googleId', auth.createUser);

module.exports = router;
