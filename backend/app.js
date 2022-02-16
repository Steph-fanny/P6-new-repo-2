// ***Imports :   express, bodyparser, mongoose
const express    = require(`express`);
const bodyParser = require(`body-parser`);
const mongoose   = require(`mongoose`);
const path       = require(`path`); // donne accés systéme de fichier images

//***** */ Modules de sécurité
const helmet = require (`helmet`);
//stocke id de cession dans le cookies 
<<<<<<< HEAD
// const cookieSession = require (`cookie-session`);


=======
const cookieSession = require (`cookie-session`);
// variable d'environnement
// const dotenv = require("dotenv").config({path :'./config/.env'})
>>>>>>> 3988c1af29edd72e65420c00cd0f00cf833b5aa6

const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");


// connexion à MongoDB =BDD
mongoose.connect(
    "mongodb+srv://STP6opr:pL7aJVPqZ3MNTzp@cluster0.t2d6e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
  

// initialisation de l'application express
const app = express();

//******mise en place sécurité */

// 1 er middleware exécuté par le server  : appliqué à toutes les réquetes
//application accéde à l'api en sécurité
//configuration des en-têtes CORS 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//protection des en-têtes HTTP grâce à Helmet
  app.use (helmet());

<<<<<<< HEAD
  ////******a finir  */
// cookies en 
// app.use(cookieSession({
//   secret : 's3Cur3',
//   cookie: { secure: true,
//             httpOnly: true,
//             domain: `http://localhost:3000`
            
//           }
//   })
=======
  
// cookies en http only
app.use(cookieSession({
  secret : "sessionS3Cur3",
  cookie: { secure: true,
            httpOnly: true,
            domain: "http://localhost:3000"
 }
}))
>>>>>>> 3988c1af29edd72e65420c00cd0f00cf833b5aa6

// **** configuration body parser
// transformer corps de la requete en json : objet js utilisable
// app.use : toutes les routes de l'appli
app.use(bodyParser.json());


app.use("/images", express.static(path.join(__dirname, "images")));

// debut de la route + NOM routeur : si le chemin prend ce debut de route => envoi vers router
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);


module.exports = app;
