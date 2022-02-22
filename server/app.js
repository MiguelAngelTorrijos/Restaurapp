const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const restaurantsRouter = require('./routes/restaurants');
const favouriteRouter = require('./routes/favourite');
const authRouter = require('./routes/auth');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
  })
);

app.use('/favourites', favouriteRouter);
app.use('/restaurants', restaurantsRouter);
app.use('/auth', authRouter);
app.use(function errorHandler(err, req, res, next) {
  console.log(error);
  res.status(500);
  res.send('error', { error: err });
});
module.exports = app;
