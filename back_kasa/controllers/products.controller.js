const Product = require("../models/products");
const fs = require("fs");

// Récupération de TOUS les produits *************************************************************
// ***********************************************************************************************

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    console.log(products.length);

    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error!");
  }
};

// Récupération de D'UN SEUL produit *************************************************************
// ***********************************************************************************************

exports.getOneProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).lean().exec();
    if (!product) {
      return res.status(404).send(new Error("Product not found!"));
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error!");
  }
};

// Gestion du like D'UN SEUL produit *************************************************************
// ***********************************************************************************************

exports.likeProduct = async (req, res, next) => {
  console.log("IN");
  console.log(req.params.id);
  console.log(req.params.liked);
  try {
    const productId = req.params.id;
    const product = Product.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).send(new Error("Product not found!"));
    }

    product.liked = !product.liked;
    console.log(product.liked);

    // Mettre à jour le fichier contenant les produits
    const updatedProducts = Product.map((p) =>
      p.id === productId ? product : p
    );
    fs.writeFile(
      "./models/products.js",
      JSON.stringify(updatedProducts),
      (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error updating product!");
        } else {
          console.log("Product updated !");
          // Envoyer le produit mis à jour au client
          res.status(200).json(product);
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating product!");
  }
};

// Suppression D'UN SEUL produit *************************************************************
// ***********************************************************************************************

exports.deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).send(new Error("Product not found!"));
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error!");
  }
};
