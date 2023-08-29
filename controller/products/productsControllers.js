const { ctrlWrapper } = require("../../utils");

const { Products } = require("../../models/products");
const { HttpError } = require("../../helpers");

const {
  updateDatabaseWithYmlFile,
  addCategoryWithYmlFile,
} = require("../../utils"); // Шлях до функції оновлення з YML-файла

const { YML_FILE } = process.env;

const ymlFilePath = YML_FILE;

const getProducts = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    sortBy = "createdAt",
    sortOrder = "asc",
  } = req.query;

  try {
    const skip = (page - 1) * perPage;
    const totalCount = await Products.countDocuments();
    const totalPages = Math.ceil(totalCount / perPage);

    const sortField = sortBy === "price" ? "price" : "createdAt";
    const sortDirection = sortOrder === "desc" ? -1 : 1;
    const sortOptions = { [sortField]: sortDirection };

    const products = await Products.find({}, "-createdAt -updatedAt")
      .sort(sortOptions)
      .skip(skip)
      .limit(perPage);

    res.json({
      totalPage: totalPages,
      totalItems: totalCount,
      perPage: perPage,
      currentPage: page,
      products: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

const findProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { page = 1, perPage = 10 } = req.query;

  try {
    const skip = (page - 1) * perPage;
    const totalCount = await Products.countDocuments({
      categoryId: categoryId,
    });
    const totalPages = Math.ceil(totalCount / perPage);
    const productsInCategory = await Products.find({ categoryId: categoryId })
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

const updateDatabase = async (req, res) => {
  try {
    await addCategoryWithYmlFile(ymlFilePath);
    await updateDatabaseWithYmlFile(ymlFilePath);
    res.status(200).json({ message: "Database updated successfully" });
  } catch (error) {
    console.error("Error updating database:", error);
    res.status(500).json({ message: "Error updating database" });
  }
};

module.exports = {
  getProducts: ctrlWrapper(getProducts),
  findProductsByCategory: ctrlWrapper(findProductsByCategory),
  updateDatabase: ctrlWrapper(updateDatabase),
};
