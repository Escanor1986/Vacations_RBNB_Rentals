const Product = require("../models/product");
// Utilisation du module 'memory-cache' pour stocker les résultats de la requête dans le cache.
const cache = require("memory-cache");
const mongoose = require("mongoose");

// Récupération de TOUS les produits *************************************************************
// ***********************************************************************************************

exports.getAllProducts = async (req, res, next) => {
  try {
    // Récupère le numéro de la page demandée, ou la première page par défaut
    const page = +req.query.page || 1;
    // Nombre d'éléments par page
    const perPage = 10;
    // Clé de cache pour cette page
    const cacheKey = `products_${page}`;

    // Vérifie si les produits sont en cache
    let cachedData = cache.get(cacheKey);
    if (!cachedData) {
      // Si les produits ne sont pas en cache, les récupérer depuis la base de données
      const totalItems = await Product.find().countDocuments();
      const products = await Product.find()
        .skip((page - 1) * perPage)
        .limit(perPage);

      // Mappe les produits en ajoutant l'URL de l'image
      const mappedProducts = products.map((product) => ({
        ...product._doc,
        imageUrl: product.imageUrl.startsWith("http")
          ? product.imageUrl // si l'URL est déjà complète, on la garde telle quelle
          : `${process.env.BASE_URL}${product.imageUrl}`, // sinon on construit l'URL complète  en concaténant
      }));

      // Mettre les produits en cache avec le nombre total d'éléments et le numéro de page actuel
      cachedData = {
        products: mappedProducts,
        totalItems: totalItems,
        currentPage: page,
      };
      cache.put(cacheKey, cachedData);
    }

    // Renvoie les produits
    res.status(200).json(cachedData.products);
  } catch (err) {
    console.error(err);
    res.status(500).send(new Error("Database error: " + err.message));
  }
};

// Récupération de D'UN SEUL produit *************************************************************
// ***********************************************************************************************

exports.getOneProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    // Vérification de la validité de l'id du produit
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error("Invalid product ID");
    }
    // Ajout de la méthode lean() pour éviter de charger tout le document 'Mongoose'
    // Ajout également de la méthode exec() pour renvoyer une Promise pour attendre la réponse de la database
    const product = await Product.findById(productId).lean().exec();
    if (!product) {
      throw new Error("Product not found");
    }
    // Utilisation de la méthode freeze() pour verrouiller l'objet 'product' et empêcher les modification accidentelles
    const safeProduct = Object.freeze({
      ...product,
      imageUrl: product.imageUrl.startsWith("http")
        ? product.imageUrl // si l'URL est déjà complète, on la garde telle quelle
        : `${process.env.BASE_URL}${product.imageUrl}`, // sinon on construit l'URL complète en concaténant
    });

    // Utilisation de 'delete' pour supprimer la propriété _id de l'objet renvoyé par la base de données pour des raisons de sécurité.
    // On ne supprime l'id de l'objet en lui-même ...
    delete safeProduct._id;
    res.status(200).json(safeProduct);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};
