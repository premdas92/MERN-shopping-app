const Products = require("../models/product-model");

const createproduct = async (req, res) => {
  try {
    const {
      name,
      image,
      price,
      quantity,
      category,
      unit,
      weight,
      packSize,
      inStock,
    } = req.body;
    const product = new Products({
      name,
      image,
      price,
      quantity,
      category,
      unit,
      weight,
      packSize,
      inStock,
    });
    await product.save();
    res.status(201).json({ message: "Product created", data: product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  limit = limit > 50 ? 50 : limit;
  const skip = (page - 1) * limit;
  try {
    const allProducts = await Products.find({}).limit(limit).skip(skip);

    res.status(200).json({ data: allProducts });
  } catch (err) {
    res.send(400).json({ error: err.message });
  }
};

const getAllProductsByCategory = async (req, res) => {
  try {
    const productCategory = req.params.category.toLowerCase();
    const products = await Products.find({ category: productCategory });
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params?.id;
    const product = await Products.findOne({ _id: id });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateProductDetails = async (req, res) => {
  try {
    const id = req.params?.id;
    const product = await Products.findOne({ _id: id });
    Object.keys(req.body).forEach((key) => (product[key] = req.body[key]));
    await product.save();
    res.status(200).json({ message: "Product Updated", data: product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const productToDelete = await Products.findByIdAndDelete(productId);
    console.log(productToDelete)
    res.status(200).json(productToDelete);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createproduct,
  getAllProducts,
  getProductById,
  getAllProductsByCategory,
  updateProductDetails,
  deleteProduct,
};
