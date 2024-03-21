const Product = require("../models/products.models");

const rainbowify = string => {
  // codes de couleur ANSI pour les couleurs de l'arc-en-ciel (rouge, jaune, vert, bleu, violet et cyan).
  const colors = [
    "\x1b[31m",
    "\x1b[33m",
    "\x1b[32m",
    "\x1b[34m",
    "\x1b[35m",
    "\x1b[36m",
  ];
  let rainbowString = "";
  // parcourt chaque caractère de la chaîne de caractères en utilisant une boucle for et ajoute
  // à chaque fois le code de couleur correspondant à la position du caractère dans le tableau colors.
  for (let i = 0; i < string.length; i++) {
    rainbowString += colors[i % colors.length] + string[i];
  }
  return rainbowString;
};

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
      return res.status(404).json({ error: "Product not found!" });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error!" });
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

// Création d'un produit *************************************************************
// ***********************************************************************************************

exports.createProduct = (req, res, next) => {
  const productObject = req.body;
  console.log(productObject);

  if (
    !productObject.title ||
    !productObject.cover ||
    !productObject.pictures ||
    !productObject.description ||
    !productObject.host.name ||
    !productObject.host.picture ||
    !productObject.location ||
    !productObject.equipments ||
    !productObject.tags
  ) {
    return res
      .status(400)
      .json({ error: rainbowify("Tous les champs doivent être renseignés") });
  }

  const product = new Product({
    title: productObject.title,
    liked: productObject.liked,
    cover: productObject.cover,
    pictures: productObject.pictures.split(","),
    description: productObject.description,
    host: {
      name: productObject.host.name.trim(),
      picture: productObject.host.picture.trim(),
    },
    rating: productObject.rating,
    location: productObject.location,
    equipments: productObject.equipments.split(","),
    tags: productObject.tags.split(","),
  });
  console.log(product);

  product
    .save()
    .then(() => {
      res
        .status(201)
        .json({ message: rainbowify("Nouvelle location créée avec succès !") });
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
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

// Mise à jour partielle ou totale d'un produit *************************************************************
// ***********************************************************************************************

exports.updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const productObject = req.body;
    console.log(productId, productObject);

    if (
      !productObject.title ||
      !productObject.cover ||
      !productObject.pictures ||
      !productObject.description ||
      !productObject.host.name ||
      !productObject.host.picture ||
      !productObject.location ||
      !productObject.equipments ||
      !productObject.tags
    ) {
      return res
        .status(400)
        .json({ error: rainbowify("Tous les champs doivent être renseignés") });
    }

    const product = await Product.findByIdAndUpdate(
      productId,
      {
        title: productObject.title,
        liked: productObject.liked,
        cover: productObject.cover,
        pictures: productObject.pictures,
        description: productObject.description,
        host: {
          name: productObject.host.name.trim(),
          picture: productObject.host.picture.trim(),
        },
        rating: productObject.rating,
        location: productObject.location,
        equipments: productObject.equipments,
        tags: productObject.tags,
      },
      {
        new: true, // retourne le document modifié plutôt que l'original
        runValidators: true, // exécute les validations de schéma lors de la mise à jour
      }
    );

    if (!product) {
      return res.status(404).send(new Error("Product not found!"));
    }

    res.status(200).json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error!");
  }
};

// Récupération du produit suivant *************************************************************
// ***********************************************************************************************

exports.getNextProduct = async (req, res) => {
  try {
    const currentRentalId = req.params.currentRentalId;
    // Chercher le produit suivant par rapport à l'identifiant de location fourni
    const nextProduct = await Product.findOne({
      _id: { $gt: currentRentalId }, // chercher un '_id' supérieur à celui fourni
    }).sort({ _id: 1 }); // trier les résultats selon l'ordre croissant de l'_id

    if (nextProduct) {
      res.status(200).json({ nextRentalId: nextProduct._id });
    } else {
      res.status(404).json({ message: "No next product found" });
    }
  } catch (error) {
    console.error("Error fetching next product:", error);
    res.status(500).json({ message: "Error fetching next product" });
  }
};

// Récupération du produit précédent *************************************************************
// ***********************************************************************************************

exports.getPreviousProduct = async (req, res) => {
  try {
    const currentRentalId = req.params.currentRentalId;
    // Chercher le produit précédent par rapport à l'identifiant de location fourni
    const previousProduct = await Product.findOne({
      _id: { $lt: currentRentalId }, // chercher un '_id' inférieur à celui fourni
    }).sort({ _id: -1 }); // trier les résultats selon l'ordre décroissant de l'_id

    if (previousProduct) {
      res.status(200).json({ previousRentalId: previousProduct._id });
    } else {
      res.status(404).json({ message: "No previous product found" });
    }
  } catch (error) {
    console.error("Error fetching previous product:", error);
    res.status(500).json({ message: "Error fetching previous product" });
  }
};
