const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const userSchema = mongoose.Schema({  
  email: { type: String, required: true, unique: true }, //email unique utilisateur
  password: { type: String, required: true }, // (MDP haché avec bcript)
});

//securité pour ne pas utiliser 2 fois la même adresse mail
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
