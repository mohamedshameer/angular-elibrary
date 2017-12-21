var express = require('express');
var app = express();
var passport = require('passport');
var profileData;
var FacebookStrategy = require('passport-facebook');
var cookieParser = require('cookie-parser')
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
passport.serializeUser(function(profile, done) {
  done(null, profile);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
app.route('/test')
  .get(function(req, res) {
    console.log("success");
  });
app.route('/')
  .get(function(req, res) {
    res.send("success");
  });
passport.use(new FacebookStrategy({
    clientID: "442045119525549",
    clientSecret: "a09f27ebafd0101f1fc18922b78cc7eb",
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    scope: ['user_friends'],
    profileFields: ['friends',"birthday", "email", "first_name", "gender", "last_name",'profileUrl','picture']
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    profileData = profile;
    return done(null, profile);
  }
));
app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/',
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.cookie('profile', JSON.stringify(profileData));
    res.redirect('http://localhost:4200/profile');
  });

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});
