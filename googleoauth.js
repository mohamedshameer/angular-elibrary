var express = require('express');
var app = express();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
    clientID: "274104412288-1htsgpb5arfdqn1487cr3im8cm49valk.apps.googleusercontent.com",
    clientSecret: "Btf2KVPsbEfayQbfUJ-EtH5o",
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true,
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log(profile);
    return done(null, profile);
  }
));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(profile, done) {
  done(null, profile);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.me',
      'https://www.googleapis.com/auth/plus.profiles.read',
      'https://www.googleapis.com/auth/plus.circles.read'
    ]
  }));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: 'localhost:4200/profile',
    failureRedirect: '/'
  }));

app.route('/')
  .get(function(req, res) {
    res.send("success");
  });


var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});
