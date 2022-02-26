// importation package cryptage de données et token
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);
const User = require("../models/user");
const mailValidator = require("email-validator");


//enregistrement de nouveau utilisateur
exports.signup = (req, res, next) => {
  const isValidateEmail = mailValidator.validate(req.body.email);
  if (!isValidateEmail) {
    res.status(400).json({message :"Le format de l'email est incorrect !"});  
  }else{          
    //// fonction hacher le MDP : fonction asynchrone
  bcrypt.hash(req.body.password, 10)
    // creation nouveau user avec MDP crypté
    .then(hash => {
      const user = new User({        
        email: req.body.email, // voir modele : user.js
        password: hash
      });
      // enregistrement utilisateur dans la BDD
      user.save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch(error =>res.status(400).json({ message: error }));          
        })
   
    .catch(error => res.status(500).json({ error }));
    
};
  
};
// Connecter des utilisateurs existants
exports.login = (req, res, next) => {
    // trouver le user dans la BDD par email rentré dans l'appli : si existe : connexion
    User.findOne({ email: req.body.email })
        .then(user => {
            // si l'utilisateur n'est pas trouvé
            if (!user) {
                return res.status(401).json({ message: "Utilisateur non trouvé !" });
            }
            // comparer MDP envoyé par utilisateur avec le hash enregistrer dans la BDD
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    // si non valide => erreur
                    if (!valid) {
                        return res.status(401).json({ message: "Mot de passe incorrect !" });
                    }
                    // renvoie token d'authentification
                    res.status(200).json({
                      userId: user._id,
                      token: jwt.sign(
                        { userId: user._id }, // pour ne pas modifier les sauces d'autres utilisateurs
                        "RANDOM_TOKEN_SECRET",
                        { expiresIn: `24h` } // token valable 24h
                      ),
                    });
                })
                .catch(error => res.status(500).json({ error })); // si pb de connexion
   })
   .catch(error => res.status(500).json({ error }));

};
