const { ctrlWrapper } = require("../../helpers");
const { Products } = require("../../models");

const getProductsByKeywords = async (req, res) => {
  const { page = 1, perPage = 10, ...query } = req.query;
  const skip = (page - 1) * perPage;
  try {
    const filteredData = await Products.find(
      {
        name: { $regex: query.search, $options: "i" },
      },
      "-createdAt -updatedAt",
      {
        skip,
        perPage,
      }
    )
      .sort({ date: -1 })
      .exec();
    const totalItems = await Products.countDocuments({
      name: { $regex: query.search, $options: "i" },
    });
    const totalPage = Math.ceil(totalItems / perPage);
    res.json({
      totalItems,
      totalPage,
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
