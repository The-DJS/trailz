require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const {
  auth: authRouter,
  parks: parksRouter,
  events: eventsRouter,
} = require('./routers');

const app = express();

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
app.use('/events', eventsRouter);

module.exports = app;
