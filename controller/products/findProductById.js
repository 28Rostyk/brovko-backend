const { ctrlWrapper } = require("../../helpers");
const { updateDatabase } = require("../../services");
const { Products } = require("../../models");
require("colors");

const findProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Products.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "product not found" });
    }
    // await updateDatabase();
    return res.status(200).json(product);
  } catch (error) {
    console.log(error.red);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { findProductById: ctrlWrapper(findProductById) };
