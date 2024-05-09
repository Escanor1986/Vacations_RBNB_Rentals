const router = require("express").Router();
const raterLimit = require("express-rate-limit");

// Limite le nombre de tentative de connexion sur le nombre et la durée
const limiter = raterLimit({
  windowMs: 6 * 60 * 1000,
  max: 60,
});

const userCtrl = require("../controllers/user.controller");

router.post("/signup", userCtrl.signup);
router.post("/login", limiter, userCtrl.login);

module.exports = router;
