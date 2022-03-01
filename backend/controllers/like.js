/**** like/ dislike des sauces 
 1.récupérer l'id de la sauce que l'on souhaite liker : findone
 2.on récuper l'ID de l'user qui a liké
 3.récupérer la valeur du like : =1 (like), =-1 (dislike), =0 (neutre)
 include : permet de determiner si un tableau contient 1 valeur : renvoi true si oui
 addToSet :rajouter l'ID du user (usersLiked) si elle n'existe pas deja : addToSet
 $inc :incrémenter le like de 1  : $inc 
*/

const Sauce = require("../models/sauce");


exports.voteSauce = (req, res, next) => {
console.log(req.body.like);

  /****** l'utilisateur aime : like = 1 (likes = +1)
     si le user ID n'est pas dans le tableau de l'objet (pour ne pas voter 2 fois) et
     si like=1 => on ajoute à like : +1 et le user dans le tableau des usersLiked */

  if (req.body.like === 1) {
    // mettre à jour la BDD
    Sauce.findByIdAndUpdate(
      // va récupérer les 1,2,3)
      // récupérer l'id de l'objet de la requete du FE dans la BDD mongoDb
      { _id: req.params.id },
      { $inc: { likes: 1 }, $addToSet: { usersLiked: req.body.userId } })
      .then(() =>
        res.status(200).json({ message: "votre like a bien été pris en compte" }))
      .catch((error) => console.log(error));

    // ********l'utilisateur n'aime pas
    //(like = -1 ( dislikes=+1))
  } else if (req.body.like === -1) {
    Sauce.findByIdAndUpdate(
      { _id: req.params.id },
      { $inc: { dislikes: +1 }, $addToSet: { usersDisliked: req.body.userId } })
      .then(() =>
        res.status(200).json({ message: "votre dislike a bien été pris en compte" }))
      .catch((error) => console.log(error));

    //******l'utilisateur veut enlever son like ou dislike*/
  } else {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        if (sauce.usersLiked.includes(req.body.userId)) {
          Sauce.updateOne(
            { _id: req.params.id },
            { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
            .then((sauce) => {
              res.status(200).json({ message: "Like supprimé !" });
            })
            .catch((error) => res.status(400).json({ error }));
        } else if (sauce.usersDisliked.includes(req.body.userId)) {
          Sauce.updateOne(
            { _id: req.params.id },
            { $pull: { usersDisliked: req.body.userId },$inc: { dislikes: -1 }})
            .then((sauce) => {
              res.status(200).json({ message: "Dislike supprimé !" });
            })
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(400).json({ error }));
  }
};
