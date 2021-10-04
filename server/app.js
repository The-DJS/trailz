require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const {
  auth: authRouter,
  parks: parksRouter,
  events: eventsRouter,
} = require('./routers');
const { handleError } = require('./helpers');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.use(
  session({
    secret: process.env.CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
); // initialize sessions
app.use(passport.initialize()); // initialize passport
app.use(passport.session()); // tell express to use passport to manage sessions
require('./helpers/auth'); // run auth functions, don't need to capture imports

app.use('/auth', authRouter);
app.use('/parks', parksRouter);
app.use('/events', eventsRouter);

// app.use(handleError);

module.exports = app;
