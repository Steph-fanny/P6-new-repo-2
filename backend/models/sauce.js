
// importer moongoose pour schema
const mongoose = require("mongoose");

//instructions P4 : methode schema
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true }, //l'identifiant unique de l'utilisateur qui a créé
  name: { type: String, required: true },
  manufacturer: { type: String, required: true }, // fabriquant
  description: { type: String, required: true },
  mainPepper: { type: String, required: true }, //— le principal ingrédient épicé
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true }, //nombre entre 1 et 10 décrivant la sauce
  likes: { type: Number }, // nb d'utilisateurs qui aiment
  dislikes: { type: Number },
  usersLiked: [{ type: String }],
  usersDisliked: [{ type: String }],
});

//exporter le modele terminé : nom modele + nom schema
module.exports = mongoose.model("Sauce", sauceSchema);
