const { Products } = require("../../models");

const getAllProductsFromDB = async (data) => {
  // console.log("fetching all products started".brightBlue);

  const {
    page = 1,
    perPage = 12,
    sortBy = "createdAt",
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

    const minPrice = await Products.findOne({}, "price").sort({ price: 1 });
    const maxPrice = await Products.findOne({}, "price").sort({ price: -1 });

    const allProducts = [...isInStock, ...isOutOfStock];

    const min = priceMin || minPrice.price;
    const max = priceMax || maxPrice.price;

    // const startIndex = Number(page) * Number(perPage) - Number(perPage);
    // const endIndex = startIndex + Number(perPage);

    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;

    const products = allProducts
      .filter((product) => product.price >= min && product.price <= max)
      .slice(startIndex, endIndex);

    // console.log("fetching all products finished".green);

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
