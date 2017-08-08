require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const layouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');
const passport = require('passport');
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require('mongoose');
const config = require('./config');


module.exports = function(app){

  const dbUrl = process.env.MONGO_URL;
  console.time('db');
  mongoose.connect(dbUrl)
    .then( () => {
      console.log(`Connected to ${dbUrl}`);
      console.timeEnd('db');
    })
    .catch( e => console.log(e));

    // default value for title local
    app.locals.title = 'Express - Generated with IronGenerator';

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(layouts);

    app.use(session({
      secret: 'angular auth passport secret shh ontime',
      resave: true,
      saveUninitialized: true,
      store: new MongoStore({mongooseConnection: mongoose.connection}),
    }));

    app.use(passport.initialize());
    app.use(passport.session());

};
