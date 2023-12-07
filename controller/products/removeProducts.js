const { ctrlWrapper } = require("../../helpers");
const { deleteProducts } = require("../../services");
require("colors");

const removeProducts = async (req, res) => {
  const response = await deleteProducts(req.body);

  const productsId = req.body.product.map((product) => product.id);

  res.status(200).json({
    status: response.status,
    message: `${
      productsId.length > 1 ? "Товари" : "Товар"
    } з ID ${productsId} успішно ${
      productsId.length > 1 ? "видалені" : "видалений"
    } із SalesDrive`,
  });
};

module.exports = { removeProducts: ctrlWrapper(removeProducts) };
