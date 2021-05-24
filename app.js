var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

// db connection
require('./config/connection');

var flightRouter = require('./routes/flight');
var passengerRouter = require('./routes/passenger');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/flight', flightRouter);
app.use('/passenger', passengerRouter);

module.exports = app;
