const { ctrlWrapper } = require("../../helpers");
const { Products } = require("../../models");

const getProductsByKeywords = async (req, res) => {
  const {
    search = "",
    page = 1,
    perPage = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
    priceMin = 0,
    priceMax = 0,
  } = req.query;

  const query = {
    name: { $regex: search, $options: "i" },
  };

  // Додайте умови для пошуку за ціною
  if (priceMin && priceMax) {
    query.price = { $gte: parseFloat(priceMin), $lte: parseFloat(priceMax) };
  } else if (priceMin) {
    query.price = { $gte: parseFloat(priceMin) };
  } else if (priceMax) {
    query.price = { $lte: parseFloat(priceMax) };
  }

  try {
    const skip = (page - 1) * perPage;
    const sortOptions = { [sortBy]: sortOrder };

    const filteredData = await Products.find(query, "-createdAt -updatedAt")
      .skip(skip)
      .sort(sortOptions)
      .limit(perPage);

    const totalItems = await Products.countDocuments(query);
    const totalPages = Math.ceil(totalItems / perPage);

    const minPrice = await Products.findOne(
      { name: { $regex: search, $options: "i" } },
      "price"
    ).sort({ price: 1 });
    const maxPrice = await Products.findOne(
      { name: { $regex: search, $options: "i" } },
      "price"
    ).sort({ price: -1 });

    // console.log("minPrice :>> ".bgBrightBlue, `${minPrice}`.brightBlue);
    // console.log("maxPrice :>> ".bgBrightBlue, `${maxPrice}`.brightBlue);

    res.json({
      totalItems,
      totalPages,
      perPage,
      currentPage: page,
      products: filteredData,
      minPrice: minPrice ? minPrice.price : 0,
      maxPrice: maxPrice ? maxPrice.price : 0,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

module.exports = {
  getProductsByKeywords: ctrlWrapper(getProductsByKeywords),
};
