// const { ctrlWrapper } = require("../../helpers");
const { Products } = require("../../models");

const getAllProductsFromDB = async (data) => {
  console.log("fetching all products started".brightBlue);

  const {
    page = 1,
    perPage = 12,
    sortBy = "quantityInStock",
    sortOrder = "asc",
    priceMin = 0,
    priceMax = 0,
  } = data;

  const query = {};

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

    if (sortBy === "quantityInStock") {
      // eslint-disable-next-line dot-notation
      sortOptions["quantityInStock"] = -1; // Спочатку відображаємо ті, що на складі
    }

    const products = await Products.find(query, "-createdAt -updatedAt")
      .sort(sortOptions)
      .skip(skip)
      .limit(perPage);

    const minPrice = await Products.findOne({}, "price").sort({ price: 1 });
    const maxPrice = await Products.findOne({}, "price").sort({ price: -1 });

    console.log("fetching all products finished".green);
    return {
      totalPages: totalPages,
      totalItems: totalCount,
      perPage: perPage,
      currentPage: page,
      products: products,
      minPrice: minPrice ? minPrice.price : 0,
      maxPrice: maxPrice ? maxPrice.price : 0,
    };
  } catch (error) {
    return {
      error: error,
      message: "Error fetching products in getAllProductsFromDB",
    };
  }
};

module.exports = { getAllProductsFromDB };
