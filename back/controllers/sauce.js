//import des modules et fichiers complémentaires
const Sauce = require('../models/sauce');
const fs = require('fs');

//route pour la Création /api/sauces
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce crée!' }))
    .catch(error => res.status(400).json({ error }));
};

//Route pour la lecture de toutes les sauces /api/sauces
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }))
};

//Route pour la lecture d'une sauce /api/sauces/:id
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }))
};

//Route pour la modification d'une Sauce /api/sauces/:id
exports.modifyOne = (req, res, next) => {
    const sauceObject = req.file ? 
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body};
    Sauce.updateOne({_id: req.params.id}, {...sauceObject , _id: req.params.id})
    .then(() => res.status(200).json({ message: 'Objet Modifié !'}))
    .catch(error => res.status(400).json({ error })); 
};

//route pour la suppresion d'une sauce /api/sauces/:id
exports.deleteOne = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message : 'Objet supprimé'}))
        .catch(error => res.status(400).json({ error }));
        });
    })
    .catch(error => res.status(500).json({ error })); 
    
};