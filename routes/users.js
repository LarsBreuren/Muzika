const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest:'./public/uploads'}); //path voor uploads
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

let User = require('../models/user'); //Gebruik de usermodel

/* GET users listing. */
router.get('/', function(req, res, next) {
    user.find({}, function(err, docs){
      if(err) res.json(err);
      else res.render('index');
    });
  })

router.get('/register', function(req, res, next) {
  res.render('register', {title: 'Registreren'}); //Render register pagina 
});

router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Login'}); //Render login pagina
});

router.get('/over', function(req, res, next) {
  res.render('over', {title: 'Over Muzika'}); //Render over pagina
});

router.post('/login',
  passport.authenticate('local',{failureRedirect:'/users/login', failureFlash: 'Verkeerde gegevens'}),
  function(req, res) {
   req.flash('success', 'je bent nu ingelogd!');
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
  let name = req.body.name; //Stop de form data in variabelen
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;
  let password2 = req.body.password2; 

  if(req.file){ // Als er een foto geupload is voer dan dit uit
  	console.log('Uploading File...');
  	var profileimage = req.file.filename;
  } else { // Geen foto -> default foto
  	console.log('No File Uploaded...');
  	var profileimage = 'noimage.jpg';
  }

  // Form validator die check of alles ingevuld en correct is.
  req.checkBody('name','Naam is verplicht').notEmpty();
  req.checkBody('email','Email is verplicht').notEmpty();
  req.checkBody('email','Email is niet geldig').isEmail();
  req.checkBody('username','Gebruikersnaam is verplicht').notEmpty();
  req.checkBody('password','Wachtwoord is verplicht').notEmpty();
  req.checkBody('password2','Wachtwoorden komen niet overeen').equals(req.body.password); // Wachtwoord check

  // Check Errors
  let errors = req.validationErrors();

  if(errors){
    res.render('register', {   // Als de validatie niet goed is render registreren opnieuw + errors
      errors: errors
    });
  } else{ // Indien er geen errors zijn maak een nieuwe user met de ingevulde data
    let newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password,
      profileimage: profileimage
    });
    User.createUser(newUser, function(err, user){ // Gebruik de model uit user.js
      if(err) throw err
      console.log(user);
    });

req.flash('succes', 'je bent geregistreerd en kan inloggen'); // Melding voor de gebruiker
    res.location('/');
    res.redirect('/'); // Redirect naar de homepagina zodat er ingelogd kan worden
  }
});

router.get('/logout', function(req, res){ // Als er naar (users)/logout genavigeerd wordt voer dit uit
  req.logout();
  req.flash('succes', 'Je bent nu uitgelogd'); 
  res.redirect('/users/login');
});

module.exports = router; //Vanaf app.js toegang tot deze file
