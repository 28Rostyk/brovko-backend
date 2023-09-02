const { ctrlWrapper } = require("../../utils");
const { createProduct } = require("../../utils/createProduct");

const addProduct = async (req, res) => {
  try {
    await createProduct(req.body);
    const { name } = JSON.parse(req.body.product[0]);
    res.status(200).json({
      res,
      message: `${name} – успішно доданий до крамниці.`,
    });
  } catch (error) {
    console.error("Помилка оновлення Крамниці: ", error);
    res.status(500).json({ message: "Помилка оновлення Крамниці" });
  }
};

module.exports = { addProduct: ctrlWrapper(addProduct) };
