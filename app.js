const createError = require('http-errors'); //Http error handling
const express = require('express'); //express framework 
const path = require('path'); //File path handler
const cookieParser = require('cookie-parser'); //Parse coookies handler
const bodyParser = require('body-parser');
const session = require('express-session'); //Session middleware
const passport = require('passport'); //Gebruikt voor authentication
const expressValidator = require('express-validator'); //Form validator
const flash = require('connect-flash'); //Pop-ups
const mongoose = require('mongoose'); 
const db = mongoose.connection;

const app = express(); //Nieuwe express instance

//Split de app.js voor overzicht
const indexRouter = require('./routes/index'); //Gebruik index.js (voor homepage/profiel)
const usersRouter = require('./routes/users'); //Gebruik users.js (voor user functies)

// view engine setup
app.set('views', path.join(__dirname, 'views')); //Haal templates uit de views map
app.set('view engine', 'pug'); //gebruik pug als generator

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); //Voeg een cookie toe aan de requests
app.use(express.static(path.join(__dirname, 'public'))); //public als statische folder

//Sessions
app.use(session({
  resave: false,
  saveUninitialized: false, // niks veranderd -> niks opslaan
  secret: 'ilikecats',
}));

// Passport middleware auth
app.use(passport.initialize()); // Initialiseer passport passport session
app.use(passport.session());

// Express Validator (uit de documentatie)
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      let namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(flash()); //Gebruik connect flash
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter); //Voor het opdelen van app.js 

// Forward 404's naar de error handlers
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals
  res.locals.message = err.message;
  res.locals.error = req.flash('error');

  // render de error pagina
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
app.listen(5000, function(){
  console.log('server gestart op poort 5000..');
})


// De basis van het login/registreer systeem heb ik gebaseerd op een tutorial van Eduonix Learning Solutions
// Link naar de tutorial: https://www.youtube.com/watch?v=hb26tQPmPl4