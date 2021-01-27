//import des modules et fichiers complémentaires
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Enregistrement de l'utilisateur /api/auth/signup
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
        email: req.body.email,
        password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur crée!' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Route login /api/auth/login
exports.login = (req,res,next) => {
    User.findOne({email : req.body.email})
    .then(user =>{
        if (!user) {
            return res.status(401).json({error : 'Utilisateur non trouvé !'});
        }
        else{
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid){
                    return res.status(401).json({error : 'Mot de passe incorrect !'});
                }else {
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId : user._id},
                            'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYxMTczOTYwMSwiaWF0IjoxNjExNzM5NjAxfQ.g-hcbPqOZ5DyWdeluvb0y1_GK4nJ-dw_M4FCXqYfW7E',
                            {expiresIn: '24h'}
                        )
                    });
                }
            })
            .catch(error => res.status(501).json({error}));
        }
    })
    .catch(error => res.status(500).json({error}));
}; 