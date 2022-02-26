// création routeur : besoin express et creation routeur
const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const passwordVerification = require("../middleware/passwordVerification");

// routes post : frond ends envoie des infos
router.post("/signup", passwordVerification, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
