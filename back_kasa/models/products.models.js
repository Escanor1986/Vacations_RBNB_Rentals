const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true, // pour garantir que chaque produit a un identifiant unique
      trim: true, // pour toutes les propriétés de chaîne de caractères pour supprimer les espaces inutiles au début et à la fin de la chaîne.
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    liked: {
      type: Boolean,
      required: true,
      trim: true,
    },
    cover: {
      type: String,
      required: true,
      trim: true,
    },
    pictures: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    host: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      picture: {
        type: String,
        required: true,
        trim: true,
      },
    },
    rating: {
      type: Number, //  Changement de rating en Number avec une valeur minimale de 0 et maximale de 5, car il s'agit d'une propriété numérique.
      required: true,
      min: 0,
      max: 5,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    equipments: {
      type: [String],
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true, // ajoute des timestamps pour createdAt et updatedAt
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
