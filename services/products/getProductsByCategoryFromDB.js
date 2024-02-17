const { Products } = require("../../models");
const { HttpError } = require("../../helpers");

const getProductsByCategoryFromDB = async (data) => {
  console.log("fetching products by category started".brightBlue);

  const {
    categoryId = "all", // (!) Подумати. Якщо categoryId === 'all' до цієї функції код взаналі не повинен дійти
    page = 1,
    perPage = 12,
    sortBy = "createdAt",
    sortOrder = "desc",
    priceMin = 0,
    priceMax = 0,
  } = data;

  if (!categoryId || categoryId === "all") {
    throw HttpError(
      400,
      "getssByCategoryFromDB called without the correct category ID"
    );
  }

  const query = { categoryId: categoryId };

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

    // if (!productsInCategory || productsInCategory.length === 0) {
    //   return res.status(404).json({
    //     error: "No products found for the given category and price range",
    //   });
    // }

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

    console.log("fetching products by category finished".green);

    return {
      totalPages: totalPages,
      totalItems: totalCount,
      perPage: perPage,
      currentPage: page,
      products: productsInCategory,
      minPrice: minPrice ? minPrice.price : 0,
      maxPrice: maxPrice ? maxPrice.price : 0,
    };
  } catch (error) {
    return {
      error: error,
      message: "Error into getProductsByCategoryFromDB ",
    };
  }
};

module.exports = { getProductsByCategoryFromDB };
