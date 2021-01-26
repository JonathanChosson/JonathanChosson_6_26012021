const express = require('express');
const bobyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb+srv://admin:pkoipa@cluster0.0fbz5.mongodb.net/projet6?retryWrites=true&w=majority', 
    { useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(() =>console.log('Connexion à MongoDB réussi'))
    .catch(() =>console.log('Connexion à MongoDb échouée'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bobyParser.json());

// app.use('/images', express.static(path.join(__dirname, 'images')));
// app.use('/api/stuff', stuffRoutes);
// app.use('/api/auth', userRoutes);


module.exports = app;