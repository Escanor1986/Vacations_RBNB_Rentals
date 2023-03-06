const express = require("express");
const router = express.Router();

const productCtrl = require("../controllers/products.controller");

// Utilisation d'un middleware pour valider les ID de produits
router.param("id", (req, res, next, id) => {
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    // Si l'ID n'est pas valide, on envoie une erreur 400
    return res.status(400).send(new Error("Invalid product ID!"));
  }
  next();
});

// Route pour récupérer tous les produits
router.get("/", productCtrl.getAllProducts);

// Route pour récupérer un produit par son ID
router.get("/:id", productCtrl.getOneProduct);

module.exports = router;
