/***ETAPES**** *
  1.Importation de jsonwebtoken
  2. Vérification de la validité du token
     *auth du token dans l'entête des requêtes: 
        const token : recupére le token dans le req.headers.authorization
      *decodage du token
      *récupération du userId du token décodé
      *comparaison avec celui de la requete
*/

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // [bear + N°]
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
      if(req.body.userId && req.body.userId != userId){
        throw 'Mauvais ID utilisateur !'
      }
      else{ 
        next();
      }   

    // si erreur si une des const =>renvoie catch
  } catch (error) {
    res.status(401).json({ error: new Error("requête non authentifiée!")});
  }
};
