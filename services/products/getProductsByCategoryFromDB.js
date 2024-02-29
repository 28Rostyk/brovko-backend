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
    const totalCount = await Products.countDocuments(query);
    const totalPages = Math.ceil(totalCount / perPage);

    const sortOptions = { [sortBy]: sortOrder };

    const isInStock = await Products.find({
      ...query,
      quantityInStock: { $gt: 0 },
    }).sort(sortOptions);

    const isOutOfStock = await Products.find({
      ...query,
      quantityInStock: { $eq: 0 },
    }).sort(sortOptions);

    const minPrice = await Products.findOne(
      { categoryId: categoryId },
      "price"
    ).sort({ price: 1 });
    const maxPrice = await Products.findOne(
      { categoryId: categoryId },
      "price"
    ).sort({ price: -1 });

    const allProducts = [...isInStock, ...isOutOfStock];

    const min = priceMin || minPrice.price;
    const max = priceMax || maxPrice.price;

    const startIndex = Number(page) * Number(perPage) - Number(perPage);
    const endIndex = startIndex + Number(perPage);

    const filterProducts = allProducts.filter(
      (product) => product.price >= min && product.price <= max
    );

    const products = filterProducts.slice(startIndex, endIndex);

    console.log("fetching products by category finished".green);

    return {
      totalPages: totalPages,
      totalItems: totalCount,
      perPage: perPage,
      currentPage: page,
      products,
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
