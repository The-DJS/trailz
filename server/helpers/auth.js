require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../database');

/**
 * tells passport how to save the user to the database.
 * this is the most general serialize callback and can be
 * used with any strategy.
 */
passport.serializeUser((user, done) => {
  done(null, user.id);
});

/**
 * tells passport how to 'un-save' the user from the database
 * this is the most general serialize callback and can be
 * used with any strategy.
 */
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/**
 * tells passport to authenticate using the google strategy.
 * client id and client secret are provided when signing up for
 * google oauth in the google developers console. callback url
 * is entered into the google developers console and the urls
 * must match. find or create extracts the first name, last name,
 * and google id from the profile returned by the google server
 * and checks to see if the user exists in the user database.
 * if it does not exist, it creates the user.
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOrCreate(
        {
          googleId: profile.id,
          firstName: profile.name.givenName || 'no first name ',
          lastName: profile.name.familyName || 'no last name',
        },
        (err, user) => cb(err, user)
      );
    }
  )
);
