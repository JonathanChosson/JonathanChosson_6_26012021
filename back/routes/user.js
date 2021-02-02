//import des modules et fichiers complémentaires
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const limiter =require ('../middleware/express-limit')

//lier les routes au controllers
router.post('/signup', limiter, userCtrl.signup);
router.post('/login', limiter, userCtrl.login);


module.exports = router;