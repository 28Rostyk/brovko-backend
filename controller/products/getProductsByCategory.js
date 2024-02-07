const { ctrlWrapper } = require("../../helpers");
const { Products } = require("../../models");

const getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  const {
    page = 1,
    perPage = 10,
    sortBy = "createdAt",
    sortOrder = "asc",
    priceMin = 0,
    priceMax = 0,
    category = "all",
  } = req.query;

  const query = { categoryId: categoryId };
  console.log(category);
  console.log(categoryId);

  if (priceMin && priceMax) {
    query.price = { $gte: parseFloat(priceMin), $lte: parseFloat(priceMax) };
  } else if (priceMin) {
    query.price = { $gte: parseFloat(priceMin) };
  } else if (priceMax) {
    query.price = { $lte: parseFloat(priceMax) };
  }

  try {
    const skip = (page - 1) * perPage;
    const totalCount = await Products.countDocuments(query);
    const totalPages = Math.ceil(totalCount / perPage);

    const sortOptions = { [sortBy]: sortOrder };

    const productsInCategory = await Products.find(
      query,
      "-createdAt -updatedAt"
    )
      .sort(sortOptions)
      .skip(skip)
      .limit(perPage);

    if (!productsInCategory || productsInCategory.length === 0) {
      return res.status(404).json({
        error: "No products found for the given category and price range",
      });
    }

    // const minPrice = await Products.findOne(query, "price").sort({ price: 1 });
    // const maxPrice = await Products.findOne(query, "price").sort({ price: -1 });

    const minPrice = await Products.findOne(
      { categoryId: categoryId },
      "price"
    ).sort({ price: 1 });
    const maxPrice = await Products.findOne(
      { categoryId: categoryId },
      "price"
    ).sort({ price: -1 });

    res.json({
      totalPages: totalPages,
      totalItems: totalCount,
      perPage: perPage,
      currentPage: page,
      products: productsInCategory,
      minPrice: minPrice ? minPrice.price : 0,
      maxPrice: maxPrice ? maxPrice.price : 0,
    });
  } catch (error) {
    console.error("Error while fetching products:", error);
    return res.status(500).json({ error: "Error while fetching products" });
  }
};

module.exports = {
  getProductsByCategory: ctrlWrapper(getProductsByCategory),
};
