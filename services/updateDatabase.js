const { autoFetchProducts } = require("./autoFetchProducts");
const { autoFetchCategories } = require("./autoFetchCategories");

const { YML_FILE } = process.env;

const ymlFilePath = YML_FILE;

const updateDatabase = async (update, fetch) => {
  try {
    console.log("== DATABASE UPDATING:".bgMagenta.white);

    switch (update) {
      case "category":
        if (fetch) {
          const updatedCategories = await autoFetchCategories(ymlFilePath, {
            response: true,
          });

          return updatedCategories;
        } else {
          await autoFetchCategories(ymlFilePath);
          break;
        }

      case "product":
        await autoFetchProducts(ymlFilePath);
        break;

      default:
        // Оновлюємо категорії та передаємо функцію для оновлення продуктів
        await autoFetchCategories(ymlFilePath);
        await autoFetchProducts(ymlFilePath);
        break;
    }

    console.log("DATABASE UPDATED SUCCESSFULLY".bgGreen);
  } catch (error) {
    console.error("Error updating database :".red, error);
  }
};

setInterval(async () => {
  updateDatabase();
}, 600000);

module.exports = { updateDatabase };
