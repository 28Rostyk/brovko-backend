const { ctrlWrapper } = require("../../helpers");

const { Products } = require("../../models");

const findProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  const {
    page = 1,
    perPage = 10,
    sortBy = "createdAt",
    sortOrder = "asc",
  } = req.query;

  try {
    const skip = (page - 1) * perPage;
    const totalCount = await Products.countDocuments({
      categoryId: categoryId,
    });
    const totalPages = Math.ceil(totalCount / perPage);

    // Визначте, чи користувач сортує за ціною
    const isSortingByPrice = sortBy === "price";
    const sortField = isSortingByPrice ? "price" : sortBy;
    const sortDirection = sortOrder === "desc" ? -1 : 1;
    const sortOptions = { [sortField]: sortDirection };

    const productsInCategory = await Products.find(
      { categoryId: categoryId },
      "-createdAt -updatedAt"
    )
      .sort(sortOptions)
      .skip(skip)
      .limit(perPage);

    if (!productsInCategory || productsInCategory.length === 0) {
      return res
        .status(404)
        .json({ error: "No products found for the given category" });
    }

    res.json({
      totalPage: totalPages,
      totalItems: totalCount,
      perPage: perPage,
      currentPage: page,
      products: productsInCategory,
    });
  } catch (error) {
    console.error("Error while fetching products:", error);
    return res.status(500).json({ error: "Error while fetching products" });
  }
};

module.exports = {
  findProductsByCategory: ctrlWrapper(findProductsByCategory),
};
