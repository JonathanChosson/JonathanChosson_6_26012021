//import des modules et fichiers complémentaires
const express = require('express');
const bobyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
require('dotenv').config();

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

const app = express();
// Sécurisation des headers
app.use(helmet())

// Initialise la connexion à mongoDB
mongoose.connect(process.env.DB_INFORMATION, 
    {   useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true})
    .then(() =>console.log('Connexion à MongoDB réussi'))
    .catch(() =>console.log('Connexion à MongoDb échouée'));


// Met en place les headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin-list, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//Utilise le package bodyParser
app.use(bobyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);


module.exports = app;