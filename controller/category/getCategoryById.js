const { ctrlWrapper } = require("../../helpers");
const { Category } = require("../../models");

const getCategoryById = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await Category.findOne(
      { id: categoryId },
      "-createdAt -updatedAt -_id"
    );

    if (!category) {
      return res.status(404).json({ error: "category not found" });
    }

    // console.log("category :>> ".bgMagenta, category);

    return res.status(200).json(category);
  } catch (error) {
    console.log("Error in getCategoryById".red, error);
  }
};

module.exports = { getCategoryById: ctrlWrapper(getCategoryById) };
