const mongoose = require("mongoose");
const User = require("./User");
const Product = require("./Product");
const Schema = mongoose.Schema;
const cartSchema = new Schema(
  {
    userId: {
      typs: mongoose.ObjectId,
      ref: User,
    },
    items: {
      productId: {
        type: mongoose.ObjectId,
        ref: Product,
      },
      size: {
        type: String,
        required: true,
      },
      qty: {
        type: Number,
        default: 1,
        required: true,
      },
    },
  },
  { timestamps: true }
);

cartSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
};

const Cart = mongoose.model("Cart", userSchema);

module.exports = Cart;
