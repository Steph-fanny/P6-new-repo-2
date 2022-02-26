const passwordValidator = require("password-validator");

//Creation modéle
const passwordSchema = new passwordValidator();

// Schema du MDP
passwordSchema
  .is().min(5) // Min 5 caractéres
  .is().max(100) // Max 100
  .has().uppercase() // doit contenir au moins X lettre maj
  .has().lowercase() // doit contenir au moins X lettre min
  .has().digits(2) // doit contenir au moins 2 chiffres
  .has().not().spaces() // ne contient pas d'espace
  .is().not().oneOf(["Passw0rd", "Password123"]); // Blacklist ces MDP

// vérification de la qualité du password par rapport au schema
// exporter le module
module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)){
      next()
    }else{
      //pourquoi le MDPa été rejeté
      return res.status(400).json({ message: `le mot de passe n'est pas assez sécurisé
        ${passwordSchema.validate('req.body.password', { liste: true })}
    `})
    }
  }
    
  
      
 







