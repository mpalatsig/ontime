const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/User');
const bcrypt = require('bcrypt');

module.exports = function (passport) {
  passport.use(new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, foundUser) => {
      if (err)
        return next(err);

      if (!foundUser)
        return next(null, false, { message: 'Incorrect username' });

      if (!bcrypt.compareSync(password, foundUser.password))
        return next(null, false, { message: 'Incorrect password' });

      next(null, foundUser);
    });
  }));

  passport.serializeUser((loggedInUser, cb) => {
    cb(null, loggedInUser._id);
  });

  passport.deserializeUser((userIdFromSession, cb) => {
    User.findById(userIdFromSession, (err, userDocument) => {
      if (err)
        return cb(err);

      cb(null, userDocument);
    });
  });

};
