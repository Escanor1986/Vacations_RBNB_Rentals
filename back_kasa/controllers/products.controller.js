const Product = require("../models/products.models");
const fs = require("fs");

// Récupération de TOUS les produits *************************************************************
// ***********************************************************************************************

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
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
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send(new Error("Product not found!"));
    }

    // Renvoyer la vue avec les informations du produit
    res.render("productDetails", { product });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error!");
  }
};

// Gestion du like D'UN SEUL produit *************************************************************
// ***********************************************************************************************

exports.likeProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send(new Error("Product not found!"));
    }

    product.liked = !product.liked;
    await product.save();
    console.log(product.liked);

    console.log("Product updated !");
    // Envoyer le produit mis à jour au client
    res.status(200).json(product);
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

    console.log(`Product ${productId} deleted from the database`);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error!");
  }
};
