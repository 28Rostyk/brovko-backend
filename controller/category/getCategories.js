const { Category } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const getCategories = async (req, res) => {
  try {
    const caregory = await Category.find({}, "-createdAt -updatedAt");
    res.json({
      caregory: caregory,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};

module.exports = {
  getCategories: ctrlWrapper(getCategories),
};
