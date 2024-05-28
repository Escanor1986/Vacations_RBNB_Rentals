const express = require("express");
const router = express.Router();
const productCtrl = require("../controllers/products.controller");
const auth = require("../config/auth");

// Middleware pour valider les ID de produits
router.param("id", (req, res, next, id) => {
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send(new Error("Invalid product ID!"));
  }
  next();
});

router.get("/", auth, productCtrl.getAllProducts);
router.post("/", auth, productCtrl.createProduct);
router.patch("/:id/like", auth, productCtrl.likeProduct);
router.put("/:id", auth, productCtrl.updateProduct);
router.get("/:id", auth, productCtrl.getOneProduct);
router.get("/next/:currentRentalId", productCtrl.getNextProduct);
router.get("/previous/:currentRentalId", productCtrl.getPreviousProduct);
router.delete("/:id", auth, productCtrl.deleteProduct);

module.exports = router;
