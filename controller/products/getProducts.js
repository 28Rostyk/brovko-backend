const { ctrlWrapper } = require("../../helpers");
const { Products } = require("../../models");

const getProducts = async (req, res) => {
  const { categoryId } = req.params;

  const {
    search = "",
    category = "all",
    page = 1,
    perPage = 10,
    sortBy = "createdAt",
    sortOrder = "asc",
    priceMin = 0,
    priceMax = 0,
  } = req.query;

  try {
    let filter = {};

    if (priceMin && priceMax) {
      filter.price = { $gte: parseFloat(priceMin), $lte: parseFloat(priceMax) };
    } else if (priceMin) {
      filter.price = { $gte: parseFloat(priceMin) };
    } else if (priceMax) {
      filter.price = { $lte: parseFloat(priceMax) };
    }

    const sortOptions = { [sortBy]: sortOrder };

    if (!categoryId && category === "all" && !search) {
      filter = { ...filter };
    } else if (search !== "") {
      console.log(search);
      filter = {
        ...filter,
        name: { $regex: search, $options: "i" },
      };
    } else if (categoryId && !search) {
      filter = {
        ...filter,
        categoryId,
      };
    }

    const totalCount = await Products.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / perPage);
    const products = await Products.find(filter, "-createdAt -updatedAt")
      .sort(sortOptions)
      .skip((page - 1) * perPage)
      .limit(perPage);

    const minPrice = await Products.findOne(filter, "price").sort({ price: 1 });
    const maxPrice = await Products.findOne(filter, "price").sort({
      price: -1,
    });

    res.json({
      totalPages,
      totalItems: totalCount,
      perPage,
      currentPage: page,
      products,
      minPrice: minPrice ? minPrice.price : 0,
      maxPrice: maxPrice ? maxPrice.price : 0,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

module.exports = {
  getProducts: ctrlWrapper(getProducts),
};
