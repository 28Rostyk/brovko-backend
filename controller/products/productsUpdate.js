const { ctrlWrapper } = require("../../utils");

const {
  updateDatabaseWithYmlFile,
  addCategoryWithYmlFile,
} = require("../../utils"); // Шлях до функції оновлення з YML-файла

const { YML_FILE } = process.env;

const ymlFilePath = YML_FILE;

const updateDatabase = async (req, res) => {
  try {
    await addCategoryWithYmlFile(ymlFilePath);
    await updateDatabaseWithYmlFile(ymlFilePath);
    res.status(200).json({ message: "Database updated successfully" });
  } catch (error) {
    console.error("Error updating database:", error);
    res.status(500).json({ message: "Error updating database" });
  }
};

module.exports = {
  updateDatabase: ctrlWrapper(updateDatabase),
};
