const { createCategory } = require("../../services");
const { ctrlWrapper } = require("../../helpers");
const { updateDatabase } = require("../database");

const addCategory = async (req, res) => {
  const update = req.query.update;
  try {
    const response = await createCategory(req.body);
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

module.exports = { addCategory: ctrlWrapper(addCategory) };
