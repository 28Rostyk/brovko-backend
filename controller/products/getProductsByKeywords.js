const { ctrlWrapper } = require("../../helpers");
const { Products } = require("../../models");

const getProductsByKeywords = async (req, res) => {
  const {
    search = "",
    page = 1,
    perPage = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = req.query;

  try {
    const skip = (page - 1) * perPage;
    const sortOptions = { [sortBy]: sortOrder };

    const filteredData = await Products.find(
      {
        name: { $regex: search, $options: "i" },
      },
      "-createdAt -updatedAt"
    )
      .skip(skip)
      .sort(sortOptions)
      .limit(perPage);

    const totalItems = await Products.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    const totalPages = Math.ceil(totalItems / perPage);

    res.json({
      totalItems,
      totalPages,
      perPage: perPage,
      currentPage: page,
      products: filteredData,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

module.exports = {
  getProductsByKeywords: ctrlWrapper(getProductsByKeywords),
};
