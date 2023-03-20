const Product = require("../models/products");
// const mongoose = require("mongoose");

// Récupération de TOUS les produits *************************************************************
// ***********************************************************************************************

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    const mappedProducts = products.map((product) => {
      product.imageUrl = `${req.protocol}://${req.get("host")}/images/${
        product.imageUrl
      }`;
      return product;
    });
    res.status(200).json(mappedProducts);
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
    product.imageUrl = `${req.protocol}://${req.get("host")}/images/${
      product.imageUrl
    }`;
    res.status(200).json(product);
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

    // Mettre à jour le produit dans la base de données
    await product.save();
    console.log("Product saved !");
    // Mettre à jour le produit dans le tableau "products"
    const index = products.findIndex((p) => p.id === productId);
    if (index >= 0) {
      products[index].liked = product.liked;
    }

    // Envoyer le produit mis à jour au client
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error!");
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
