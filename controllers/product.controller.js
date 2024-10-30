const productController = {};
const Product = require("../Models/Product");

productController.createProduct = async (req, res) => {
  try {
    const {
      sku,
      name,
      size,
      image,
      category,
      description,
      price,
      stock,
      status,
    } = req.body;

    const product = new Product({
      sku,
      name,
      size,
      image,
      category,
      description,
      price,
      stock,
      status,
    });

    await product.save();
    res.status(201).json({ status: "success", product });
  } catch (e) {
    res.status(500).json({ error: e.message || "서버 오류" });
  }
};

productController.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ status: "success", products });
  } catch (e) {
    res.status(500).json({ error: e.message || "서버 오류" });
  }
};

module.exports = productController;
