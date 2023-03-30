const express = require("express");
const router = express.Router();
const productCtrl = require("../controllers/products.controller");

// // Utilisation d'un middleware pour valider les ID de produits
// router.param("id", (req, res, next, id) => {
//   if (!id.match(/^[0-9a-fA-F]{24}$/)) {
//     // Si l'ID n'est pas valide, on envoie une erreur 400
//     return res.status(400).send(new Error("Invalid product ID!"));
//   }
//   next();
// });

// Route pour récupérer tous les produits
router.get("/", productCtrl.getAllProducts);

// Route pour créer un produits
router.post("/", productCtrl.createProduct);

// Route pour gérer le like sur les produits
router.patch("/:id/like", productCtrl.likeProduct);

// Route pour gérer le like sur les produits
router.put("/:id", productCtrl.updateProduct);

// Route pour récupérer un produit par son ID
router.get("/:id", productCtrl.getOneProduct);

// Route pour récupérer le produit suivant par son ID
router.get("/next/:currentRentalId", productCtrl.getNextProduct);

// Route pour récupérer le produit précédent par son ID
router.get("/previous/:currentRentalId", productCtrl.getPreviousProduct);

// Route pour supprimer un produit
router.delete("/:id", productCtrl.deleteProduct);

module.exports = router;
