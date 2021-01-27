//import des modules et fichiers complémentaires
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

//lier les routes au controllers
router.post('/signup', userCtrl.signup);


module.exports = router;