//import des modules et fichiers complémentaires
const mongoose = require('mongoose'); 
const uniqueValidator = require('mongoose-unique-validator');

// créer un model pour la BDD
const userSchema = mongoose.Schema({
    email: { type: String, required : true, unique: true},
    password : {type: String, required : true},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);