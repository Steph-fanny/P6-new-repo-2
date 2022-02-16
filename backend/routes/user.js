// création routeur : besoin express et creation routeur
const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");

// routes post : frond ends envoie des infos
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
