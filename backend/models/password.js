const passwordValidator = require("password-validator");

//Creation modéle 
const passwordSchema = new passwordValidator();

// propiétes du MDP
passwordSchema
  .is().min(10) // Min 10 caractéres
  .is().max(100) // Max 100
  .has().uppercase() // doit contenir au moins 1 lettre maj
  .has().lowercase() // doit contenir au moins 1 lettre min
  .has().digits(2) // doit contenir au moins 1 chiffre
  .has().not().spaces() // ne contient pas d'espace
  .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist ces MDP

// exporter le module
module.exports = passwordSchema;