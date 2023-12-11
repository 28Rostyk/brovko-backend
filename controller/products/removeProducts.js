const { ctrlWrapper } = require("../../helpers");
const { deleteProducts } = require("../../services");
const { updateDatabase } = require("../database");
require("colors");

const removeProducts = async (req, res) => {
  try {
    const productsId = req.body.product.map((product) => product.id);

    const response = await deleteProducts(req.body);

    await updateDatabase();

    res.status(200).json({
      status: response.status,
      message: `${
        productsId.length > 1 ? "Товари" : "Товар"
      } з ID ${productsId} успішно ${
        productsId.length > 1 ? "видалені" : "видалений"
      } із SalesDrive`,
    });
  } catch (error) {
    console.log("ERROR PRODUCT REMOVING");
  }
};

module.exports = { removeProducts: ctrlWrapper(removeProducts) };
