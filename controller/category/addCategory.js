const { createCategory } = require("../../services");
const { ctrlWrapper } = require("../../helpers");
const { updateDatabase } = require("../database");

const addCategory = async (req, res) => {
  const update = req?.query?.update ? req.query.update : null;
  const fetch = req?.query?.fetch ? req.query.fetch : null;
  try {
    const response = await createCategory(req.body);

    const result = {
      status: response.data.status,
      message: response.message,
    };

    const updatedCategories = await updateDatabase(update, fetch);

    if (fetch) {
      result.updatedCategories = updatedCategories;
    }

    res.status(201).json({
      result,
    });
  } catch (error) {
    console.log("Error in Controller: ", error.message);
    res.json({ message: error.message });
  }
};

module.exports = { addCategory: ctrlWrapper(addCategory) };
