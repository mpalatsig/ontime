const express = require('express');
// const favicon = require('serve-favicon');
const path = require('path');
const layouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

require('./config/passport/local')(passport);
require('./config/express')(app);
require('./config/cors')(app);

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


app.use((req, res, next) => {
  res.sendfile(__dirname + '/public/index.html');
});

require('./config/error-handler')(app);

module.exports = app;
