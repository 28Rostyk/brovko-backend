const { Category } = require("../../models/caregory");
const { ctrlWrapper } = require("../../utils");

const getCategory = async (req, res) => {
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
  getCategory: ctrlWrapper(getCategory),
};
