const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/muzika',{ useCreateIndex: true, useNewUrlParser: true });

const db = mongoose.connection;

// User Schema
const UserSchema = mongoose.Schema({
	gebruikersnaam: {
		type: String,
		index: true // Maak gebruikersnaam de index
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	voornaam: {
		type: String
	},
	genre:{
		type: String
	},
	leeftijd:{
		type: Number
	},
	profielfoto:{
		type: String
	}
});

const User = module.exports = mongoose.model('User', UserSchema); // Maak de model buiten deze file beschikbaar
//Maak de volgende functies beschikbaar voor andere files
module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.getUserBygebruikersnaam = function(gebruikersnaam, callback){
	const query = {gebruikersnaam: gebruikersnaam};
	User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	callback(null, isMatch);
	});
}

module.exports.createUser = function(newUser, callback){ 
	bcrypt.genSalt(10, function(err, salt) { // Hash het wachtwoord door middel van bcrypt
    	bcrypt.hash(newUser.password, salt, function(err, hash) {
   			newUser.password = hash;
   			newUser.save(callback);
    	});
	});
}