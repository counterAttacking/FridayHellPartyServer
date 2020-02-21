var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { createConnection } = require('typeorm');
const passport = require('passport');
var indexRouter = require('./routes/index');
var cors = require('cors');
var app = express();

(async() => { await createConnection(); })();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(passport.initialize()); 
require('./config/passport')(passport);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

module.exports = app;
