// importation multer : gérer les fichiers entrant: telechargement fichiers des utilisateurs
// pour image sauce
const multer = require("multer");

// dictionnaire objet d'extension image
const MIMES_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};
// objet de configuration de multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => { // fonction dans quel dossier enregistrer les fichiers
    callback(null, "images")
  },
    filename : (req, file, callback) =>{
        const name = file.originalname.split(' ').join('_'); // générér le nouveau nom fichier 
        const extension = MIMES_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension) // création nom entier sans espace.extention
    }
});
 

module.exports = multer({ storage: storage }).single("image");
