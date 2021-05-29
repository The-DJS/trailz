require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const { auth: authRouter, parks: parksRouter } = require('./routers');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(
  cors({
    'Access-Control-Allow-Origin':
      'https://accounts.google.com/o/oauth2/v2/auth',
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
require('./helpers/auth');

app.use('/auth', authRouter);
app.use('/parks', parksRouter);

module.exports = app;
