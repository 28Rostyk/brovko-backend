const { ctrlWrapper } = require("../../helpers");
const { Products } = require("../../models");

const getAllProducts = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    sortBy = "createdAt",
    sortOrder = "asc",
  } = req.query;

  try {
    const skip = (page - 1) * perPage;
    const totalCount = await Products.countDocuments();
    const totalPages = Math.ceil(totalCount / perPage);

    const sortOptions = { [sortBy]: sortOrder };

    const products = await Products.find({}, "-createdAt -updatedAt")
      .sort(sortOptions)
      .skip(skip)
      .limit(perPage);

    res.json({
      totalPages: totalPages,
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

module.exports = {
  getAllProducts: ctrlWrapper(getAllProducts),
};
