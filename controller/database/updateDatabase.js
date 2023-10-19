const { ctrlWrapper } = require("../../helpers");

const { autoFetchProducts, autoFetchCategories } = require("../../services"); // Шлях до функції оновлення з YML-файла

const { YML_FILE } = process.env;

const ymlFilePath = YML_FILE;

const updateDatabase = async () => {
  try {
    await autoFetchCategories(ymlFilePath);
    await autoFetchProducts(ymlFilePath);
    console.log("Database updated successfully");
  } catch (error) {
    console.error("Error updating database:", error);
  }
};

module.exports = { updateDatabase: ctrlWrapper(updateDatabase) };
