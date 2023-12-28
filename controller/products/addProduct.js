const { ctrlWrapper } = require("../../helpers");
const { createProduct } = require("../../services");
const { updateDatabase } = require("../../services/updateDatabase");
// const { changeImage } = require("../../services");

const addProduct = async (req, res) => {
  // const body = await changeImage(req.body);

  const update = req.query.update;

  try {
    const response = await createProduct(req.body);
    await updateDatabase(update);
    res.status(201).json({
      status: response.data.status,
      message: response.message,
    });
  } catch (error) {
    console.log("Error in Controller: ", error.message);
    res.json({ message: error.message });
  }
};

module.exports = { addProduct: ctrlWrapper(addProduct) };
