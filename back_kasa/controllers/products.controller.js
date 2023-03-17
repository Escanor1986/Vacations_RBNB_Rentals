const Product = require("../models/product");
// Utilisation du module 'memory-cache' pour stocker les résultats de la requête dans le cache.
const cache = require("memory-cache");
const mongoose = require("mongoose");

// Récupération de TOUS les produits *************************************************************
// ***********************************************************************************************

exports.getAllProducts = async (req, res, next) => {
  try {
    // Clé de cache pour les produits
    const cacheKey = `products`;

    // Vérifie si les produits sont en cache
    let cachedData = cache.get(cacheKey);
    if (!cachedData) {
      // Si les produits ne sont pas en cache, les récupérer depuis la base de données
      const products = await Product.find();

      // Mappe les produits en ajoutant les propriétés nécessaires
      const mappedProducts = products.map((product) => ({
        id: product._id,
        title: product.title,
        cover: product.imageUrl.startsWith("http")
          ? product.imageUrl // si l'URL est déjà complète, on la garde telle quelle
          : `${process.env.BASE_URL}${product.imageUrl}`, // sinon on construit l'URL complète en concaténant
        pictures: product.pictures.map(
          (picture) =>
            picture.startsWith("http")
              ? picture // si l'URL est déjà complète, on la garde telle quelle
              : `${process.env.BASE_URL}${picture}` // sinon on construit l'URL complète en concaténant
        ),
        description: product.description,
        host: {
          name: product.host.name,
          picture: product.host.picture.startsWith("http")
            ? product.host.picture // si l'URL est déjà complète, on la garde telle quelle
            : `${process.env.BASE_URL}${product.host.picture}`, // sinon on construit l'URL complète en concaténant
        },
        rating: product.rating.toString(),
        location: product.location,
        equipments: product.equipments,
        tags: product.tags,
      }));

      // Mettre les produits en cache
      cachedData = {
        products: mappedProducts,
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
      id: product._id,
      title: product.title,
      cover: product.cover,
      pictures: product.pictures,
      description: product.description,
      host: {
        name: product.host.name,
        picture: product.host.picture,
      },
      rating: product.rating,
      location: product.location,
      equipments: product.equipments,
      tags: product.tags,
      imageUrl: product.imageUrl.startsWith("http")
        ? product.imageUrl // si l'URL est déjà complète, on la garde telle quelle
        : `${process.env.BASE_URL}${product.imageUrl}`, // sinon on construit l'URL complète en concaténant
    });

    res.status(200).json(safeProduct);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};
