var express = require('express');
var router = express.Router();

/* GET Homepagina */
router.get('/', ensureAuthenticated, function(req, res, next) { //gebruik functie ensureAuthenticated
  res.render('index', { title: 'Profiel' });
});

function ensureAuthenticated(req, res, next){ //indien de gebruiker niet ingelogged is verwijs naar login
  if(req.isAuthenticated()){
    console.log('Authenticate goedgekeurd');
    return next();
  }
  res.redirect('/users/login');
}

module.exports = router; //toegang vanaf andere file
