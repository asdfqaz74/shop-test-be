const mongoose = require("mongoose");
const User = require("./User");
const Product = require("./Product");
const Schema = mongoose.Schema;
const orderSchema = new Schema(
  {
    shipTo: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.ObjectId,
      ref: User,
    },
    status: {
      type: String,
      default: "pending",
    },
    items: [
      {
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
        price: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

orderSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
};

const Order = mongoose.model("Order", userSchema);

module.exports = Order;
