const router = require("express").Router();
const rateLimit = require("express-rate-limit");
const userCtrl = require("../controllers/user.controller");

// Limite le nombre de tentatives de connexion
const limiter = rateLimit({
  windowMs: 6 * 60 * 1000, // 6 minutes
  max: 60, // limite chaque IP à 60 requêtes par fenêtre
});

router.post("/signup", userCtrl.signup);
router.post("/login", limiter, userCtrl.login);

module.exports = router;
