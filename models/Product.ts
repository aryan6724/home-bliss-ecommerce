import mongoose, { Schema, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 1,
    },

    image: {
      type: String,
      required: true,
      trim: true,
    },

    badge: {
      type: String,
      default: "New",
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    material: {
      type: String,
      required: true,
      trim: true,
    },

    delivery: {
      type: String,
      required: true,
      trim: true,
    },

    showOnHome: {
      type: Boolean,
      default: false,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product =
  models.Product || mongoose.model("Product", ProductSchema);

export default Product;