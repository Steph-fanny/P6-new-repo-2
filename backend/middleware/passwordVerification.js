const passwordSchema = require("../models/password");

// controle du MDP rentré par l'utilisateur 
module.exports = (req, res, next) => {
    if(!passwordSchema.validate(req.body.password)){   
        res.status(400).json({ error: "le mot de passe n'est pas assez sécurisé"});
        console.log ("le mot de passe doit contenir au moins une min, une maj et des chiffres")
    }
    else{
      next()
    }
}
