var passport = require('passport');


exports = module.exports = function(directory) {
  passport.use(require('./auth/local')(directory));
  passport.use('accounts.google.com', require('./auth/google')());
  passport.use('twitter.com', require('./auth/twitter')());
  

  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
    directory.get(id, function(err, user) {
      if (err) { return cb(err); }
      return cb(null, user);
    });
  });
  
  
  return passport;
};
