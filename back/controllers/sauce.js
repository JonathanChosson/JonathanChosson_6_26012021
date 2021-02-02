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

//route pour le like/dislike /api/sauces/:id/like
exports.like = (req, res, next) => {
    switch(req.body.like) {
        // L'utilisateur aime la sauce on incrémente les likes et on ajoute l'utilisateur au tableau usersLiked
    case 1:
        Sauce.updateOne({ _id: req.params.id }, {
            $inc: {likes: 1},
            $push: { usersLiked: req.body.userId },
            _id: req.params.id
        })
        .then( sauce => { res.status(201).json({ message: `Vous aimez la sauce ${sauce.name}` }); })
        .catch((error) => { res.status(400).json({ error: error }); });
    break;
        // L'utilisateur n'aime pas la sauce on incrémente les dislikes et on ajoute au tableau userDisliked
    case -1:
        Sauce.updateOne({ _id: req.params.id }, {
            $inc: {dislikes: 1},
            $push: { usersDisliked: req.body.userId },
            _id: req.params.id
        })
        .then( sauce => { res.status(201).json({ message: `Vous n'aimez pas la sauce ${sauce.name}` }); })
        .catch((error) => { res.status(400).json({ error: error }); });
    break;
        //On verfie le précédant choix de l'User et remet à 0 
    case 0:
        Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            if (sauce.usersLiked == req.body.userId){
                console.log("userlike dejà");
                Sauce.updateOne({ _id: req.params.id }, {
                    $inc: {likes: -1},
                    $pull: { usersLiked: req.body.userId },
                    _id: req.params.id
                })
                .then( sauce => { res.status(201).json({ message: `Vous n'aimez plus la sauce ${sauce.name}` }); })
                .catch((error) => { res.status(400).json({ error: error }); });
            }
            else if (sauce.usersDisliked == req.body.userId){
                Sauce.updateOne({ _id: req.params.id }, {
                    $inc: {dislikes: -1},
                    $pull: { usersDisliked: req.body.userId },
                    _id: req.params.id
                })
                .then( sauce => { res.status(201).json({ message: `Vous commencez à aimer la sauce ${sauce.name}` }); })
                .catch((error) => { res.status(400).json({ error: error }); });
            };
            
        })
        .catch(error => res.status(400).json({ error }))
        
    }
}

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