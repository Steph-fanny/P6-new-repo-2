// création routeur : besoin express et creation routeur
const express = require("express");
const router = express.Router();

// protection/ sécurité des routes 
const auth = require("../middleware/auth");

// ajoute fichier entrant : images
const multer = require("../middleware/multer-config");
// importer le controller sauce
const sauceCtrl = require('../controllers/sauce');
const likeCtrl = require('../controllers/like');

//créer une sauce
router.post("/", auth, multer, sauceCtrl.createSauce);

// modifier la sauce 
router.put("/:id", auth, multer, sauceCtrl.modifySauce);

// supprimer une sauce
router.delete("/:id", auth, sauceCtrl.deleteSauce);

//ROUTES middleware affichages toutes les sauces
router.get("/", auth, sauceCtrl.getAllSauce);
     
// récupérer une sauce par son id:
router.get("/:id", auth, sauceCtrl.getOneSauce);

// liker/ disliker une sauce
router.post("/:id/like", auth, likeCtrl.voteSauce);


module.exports = router;
