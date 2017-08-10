const express = require('express');
// const favicon = require('serve-favicon');
const path = require('path');
const layouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

require('./config/cors')(app);
require('./config/express')(app);



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(layouts);
app.use(express.static(path.join(__dirname, 'public')));

require('./config/passport/local')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const eventsApi = require('./routes/eventsApi');
app.use('/api', eventsApi);

const usersApi = require('./routes/usersApi');
app.use('/api', usersApi);

const penaltiesApi = require('./routes/penaltiesApi');
app.use('/api', penaltiesApi);

const teamsApi = require('./routes/teamsApi');
app.use('/api', teamsApi);

const eventUserRelApi = require('./routes/eventUserRelApi');
app.use('/api', eventUserRelApi);

const teamUserRelApi = require('./routes/teamUserRelApi');
app.use('/api', teamUserRelApi);

app.use('/*',(req, res, next) => {
  res.sendFile(__dirname + '/public/index.html');
});

require('./config/error-handler')(app);

module.exports = app;
