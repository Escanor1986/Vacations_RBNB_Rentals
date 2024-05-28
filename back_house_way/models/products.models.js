const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
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
      type: Number,
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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserId",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
