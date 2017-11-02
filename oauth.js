var express = require('express');
var app = express();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');
app.use(passport.initialize());
app.use(passport.session());

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
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    return done(null, profile);
  }
));
app.get('/auth/facebook',
  passport.authenticate('facebook', {
    authType: 'rerequest',
    scope: ['user_friends']
  }));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/'
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/test');
  });

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});
