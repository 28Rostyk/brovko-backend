const { ctrlWrapper } = require("../utils");

const { Products } = require("../models/products");
const { HttpError } = require("../helpers/httpError");

const getProducts = async (req, res) => {
  const { page = 1, perPage = 10 } = req.query;

  try {
    const skip = (page - 1) * perPage;
    const totalCount = await Products.countDocuments();
    const totalPages = Math.ceil(totalCount / perPage);

    const products = await Products.find({}, "-createdAt -updatedAt")
      .skip(skip)
      .limit(perPage);

    res.json({
      totalPage: totalPages,
      totalItems: totalCount,
      perPage: perPage,
      currentPage: page,
      products: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

const deleteContact = async (req, res, next) => {
  const { productId: id } = req.params;
  console.log(id);
  const result = await Products.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json({
    message: "Delete success",
  });
};

module.exports = {
  getProducts: ctrlWrapper(getProducts),
  deleteContact: ctrlWrapper(deleteContact),
};
