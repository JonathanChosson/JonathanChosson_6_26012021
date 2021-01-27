//import des modules et fichiers complémentaires
const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//lier les routes au controllers
router.post('/', auth, multer, sauceCtrl.createSauce);    // C
router.get('/', auth, sauceCtrl.getAllSauce);             // R
router.get('/:id', auth, sauceCtrl.getOneSauce);          // R
router.put('/:id', auth, multer, sauceCtrl.modifyOne);    // U
router.delete('/:id', auth, multer, sauceCtrl.deleteOne); // D

module.exports = router;