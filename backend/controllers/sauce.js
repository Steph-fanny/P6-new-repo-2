/* Etapes
    fonction pour la création : post
    Récupérer une sauce  : par son id : get
    Modification : put
    Suppression : delete
    Récupérer toutes les sauces : get
*/
// enregistrement dasn la BDD
const Sauce = require("../models/sauce")
const fs = require("fs"); 


// *****fonction pour la création d'une sauce : post 
exports.createSauce = (req, res, next) => { 
  // on parse les données envoyés pour les récupérer
  const sauceObjet = JSON.parse(req.body.sauce);  
  delete sauceObjet._id;
  sauceObjet.likes = 0;
  sauceObjet.dislikes = 0;
  const sauce = new Sauce({    
    ...sauceObjet, // va copier les champs du body de la request : toutes les infos

    // récupérer l'url compléte de l'image,
    //1 er: http ou https (protocol) + host du serveur : racine + nom fichier
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename }`,
  });
   //req.protocol: http ou https et req.get('host') ici localhost:3000
    sauce.save() // enregistre l'objet dans la base
    .then( res.status(201).json({ message: "Sauce enregistrée !" }))
    .catch(error => res.status(401).json({ error }));
};

//*****récupérer une sauce  : get
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) // trouver la sauce ayant le même -id que parametre req
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

// ***** modification d'une sauce selectionnée : put
exports.modifySauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
// tableau de 2 élements  : on récupére  nom de fichier tout ce qu'il y a apres /images/
    const filename = sauce.imageUrl.split(`/images/`)[1];
    // fonction de fs : unlink (suppression) ancienne image si modif
    fs.unlink(`images/${filename}`,() => {
    const sauceObject = req.file ? //soit on change l'image si une nouvelle soit on modifie juste le corps de la requête
        {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };   
       
  //1er argument:  quelle sauce on veut modifier, 2 eme: récupère les infos du body pour les attribuer au même id
  Sauce.updateOne(
    { _id: req.params.id }, 
    { ...sauceObject, _id: req.params.id }
    )    
    .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
    .catch((error) => res.status(400).json({ error }));
    });
  });
}
  

//****supprimer une sauce 
exports.deleteSauce = (req, res, next) => {
  // const currentUser = res.locals.idUser;
  // chercher  l'objet à supprimer pour  avoir url image => accés noms fichier à supprimer
   Sauce.findOne({ _id: req.params.id })
    // récupération d'1 sauce avec nom fichier
   .then(sauce => {
     // tableau de 2 élements  : on récupére  nom de fichier tout ce qu'il y a apres /images/
      const filename = sauce.imageUrl.split(`/images/`)[1];
      // fonction de fs : unlink (suppression)
      fs.unlink(`images/${filename}`,() => {
      // suppression de la base de donnée
    sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
    .catch(error => res.status(400).json({ error }));
      });
   })
   .catch(error => res.status(500).json({ error }));
};

//****récupération de  toutes les sauces 
exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));   
};

/**** like/ dislike des sauces 
 * récupérer l'id de la sauce que l'on souhaite liker : findone
 * chercher le tableau de la sauce: 
 * rajouter l'ID du user (usersLiked) si elle n'existe pas deja : addToSet
 * incrémenter le like de 1  : $inc
 * 
 * puis injecter l'ID du post liké : liked
  
*/

// exports.voteSauce = (req, res, next) => { 
//   // l'utilisateur aime  
//     console.log(req.body.like);
//   if (req.body.like === 1 ){
//     Sauce.findByIdAndUpdate(
//       //findByIdAndUpdate
//       { _id: req.params.id }, // si trouve userId dans la requete
//       { $inc: { likes: +1 }, $push: { usersLiked: req.body.userId } }
//     )
//       .then(() =>
//         res
//           .status(200)
//           .json({ message: "votre like a bien été pris en compte" })
//       )
//       .catch((error) => console.log(error));
//     // l'utilisateur n'aime pas
//     }else if(req.body.like === -1) {
//       Sauce.findByIdAndUpdate(
//         { _id: req.params.id },
//         { $inc: { dislikes: +1 },$push: { usersDisliked: req.body.userId } })
//           .then(() => res.status(200).json({ message: "votre dislike a bien été pris en compte" }))
//           .catch((error) => console.log(error));

//     } else{
//     //  l'utilisateur enléve le like ou dislike
//       Sauce.findOne({_id : req.params.id})
//         .then(sauce => {
//           // si le userId est dans la tableau userLiked
//           if (sauce.usersLiked.includes(req.body.userId) && req.body.like === 0 ){
//             Sauce.updatedOne(
//               { _id: req.params.id },
//               // on enleve -1 au like; pull supprime toutes les valeurs existantes du userId
//               { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } })
//               .then(() => res.status(200).json({ message: "like supprimé" }))
//               .catch((error) => console.log(error));
//           } else if (
//             (sauce.usersDisliked.includes(req.body.userId) && req.body.like === 0)){
//             Sauce.updateOne(
//               { _id: req.params.id },
//               { $inc: { dislikes: -1 },
//                 $pull: { usersDisliked: req.body.userId },
//               }
//             )
//               .then(() => {
//                 res.status(201).json({ message: "Dislike supprimé !" });
//               })
//               .catch((error) => res.status(400).json({ error }));
//           }            
//       })
//   .catch(error => res.status(400).json({ error }));
//   }
// }

      
  
 










