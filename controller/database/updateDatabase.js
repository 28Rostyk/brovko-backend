const { ctrlWrapper } = require("../../helpers");
require("colors");

const { autoFetchProducts, autoFetchCategories } = require("../../services"); // Шлях до функції оновлення з YML-файла

const { YML_FILE } = process.env;

const ymlFilePath = YML_FILE;

const updateDatabase = async () => {
  try {
    await autoFetchProducts(ymlFilePath);
    await autoFetchCategories(ymlFilePath);
    console.log(`${"DATABASE UPDATED SUCCESSFULLY"}`.cyan);
  } catch (error) {
    console.error("Error updating database:", error);
  }
};
// updateDatabase();
module.exports = { updateDatabase: ctrlWrapper(updateDatabase) };
