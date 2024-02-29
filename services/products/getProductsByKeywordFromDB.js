const { Products } = require("../../models");

const getProductsByKeywordFromDB = async (data) => {
  const {
    search = "",
    page = 1,
    perPage = 12,
    sortBy = "createdAt",
    sortOrder = "desc",
    priceMin = 0,
    priceMax = 0,
  } = data;

  const query = {
    name: { $regex: search, $options: "i" },
  };

  if (priceMin && priceMax) {
    query.price = { $gte: parseFloat(priceMin), $lte: parseFloat(priceMax) };
  } else if (priceMin) {
    query.price = { $gte: parseFloat(priceMin) };
  } else if (priceMax) {
    query.price = { $lte: parseFloat(priceMax) };
  }

  try {
    const totalItems = await Products.countDocuments(query);
    const totalPages = Math.ceil(totalItems / perPage);

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
      { name: { $regex: search, $options: "i" } },
      "price"
    ).sort({ price: 1 });
    const maxPrice = await Products.findOne(
      { name: { $regex: search, $options: "i" } },
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

    return {
      totalItems,
      totalPages,
      perPage,
      currentPage: page,
      products,
      minPrice: minPrice ? minPrice.price : 0,
      maxPrice: maxPrice ? maxPrice.price : 0,
    };
  } catch (error) {
    return {
      error: error,
      message: "Error into getProductsByKeywordFromDB ",
    };
  }
};

module.exports = { getProductsByKeywordFromDB };
