//import des modules et fichiers complémentaires
const mongoose = require('mongoose'); 

// créer un model pour la BDD
const sauceSchema = mongoose.Schema({
    userId: { type: String, required : true},
    name : {type: String, required : true},
    manufacturer : {type: String, required : true},
    description : {type: String, required : true},
    mainPepper: {type: String, required : true},
    imageUrl : {type: String, required : true},
    heat : {type: String, required : true},
    likes: { type: Number, required: false, default: 0 },
    dislikes: { type: Number, required: false, default: 0 },
    usersLiked: { type: [String], required: false },
    usersDisliked: { type: [String], required: false }
});


module.exports = mongoose.model('Sauce', sauceSchema);