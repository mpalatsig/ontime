const express = require('express');
// const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

require('./config/passport/local')(passport);
require('./config/express')(app);
require('./config/cors')(app);


const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const eventsApi = require('./routes/eventsApi');
app.use('/api', eventsApi);

const usersApi = require('./routes/usersApi');
app.use('/api', usersApi);

const penaltiesApi = require('./routes/penaltiesApi');
app.use('/api', penaltiesApi);




app.use((req, res, next) => {
  res.sendfile(__dirname + '/public/index.html');
});

require('./config/error-handler')(app);

module.exports = app;
