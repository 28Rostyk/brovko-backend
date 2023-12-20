const { Category } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}, "-createdAt -updatedAt -_id");
    res.json({
      categories: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};

module.exports = {
  getCategories: ctrlWrapper(getCategories),
};
