const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest:'./public/uploads'}); //path voor uploads
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

let User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  user.find({},function(req, res){
    user.find({}, function(err, docs){
      if(err) res.json(err);
      else res.render('index', {users: doc});
    });
  })
});

router.get('/register', function(req, res, next) {
  res.render('register', {title: 'Register'});
});

router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Login'});
});


router.post('/login',
  passport.authenticate('local',{failureRedirect:'/users/login', failureFlash: 'Invalid username or password'}),
  function(req, res) {
   req.flash('success', 'You are now logged in');
   res.redirect('/');
});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(function(username, password, done){
  User.getUserByUsername(username, function(err, user){
    if(err) throw err;
    if(!user){
      return done(null, false, {message: 'Unknown User'});
    }

    User.comparePassword(password, user.password, function(err, isMatch){
      if(err) return done(err);
      if(isMatch){
        return done(null, user);
      } else {
        return done(null, false, {message:'Invalid Password'});
      }
    });
  });
}));

router.post('/register', upload.single('profileimage'), function(req, res, next) {
  let name = req.body.name;
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;
  let password2 = req.body.password2;

  if(req.file){
  	console.log('Uploading File...');
  	var profileimage = req.file.filename;
  } else {
  	console.log('No File Uploaded...');
  	var profileimage = 'noimage.jpg';
  }

  // Form validator
  req.checkBody('name','Naam is verplicht').notEmpty();
  req.checkBody('email','Email is verplicht').notEmpty();
  req.checkBody('email','Email is niet geldig').isEmail();
  req.checkBody('username','Gebruikersnaam is verplicht').notEmpty();
  req.checkBody('password','Wachtwoord is verplicht').notEmpty();
  req.checkBody('password2','Wachtwoorden komen niet overeen').equals(req.body.password);

  // Check Errors
  let errors = req.validationErrors();

  if(errors){
    res.render('register', {
      errors: errors
    });
  } else{
    let newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password,
      profileimage: profileimage
    });
    User.createUser(newUser, function(err, user){
      if(err) throw err
      console.log(user);
    });

req.flash('succes', 'je bent geregistreerd en kan inloggen');

    res.location('/');
    res.redirect('/');
  }
});

router.get('/logout', function(req, res){
  req.logout();
  req.flash('succes', 'Je bent nu uitgelogd');
  res.redirect('/users/login');
});

module.exports = router;
