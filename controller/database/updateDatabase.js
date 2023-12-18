// const { ctrlWrapper } = require("../../helpers");
// require("colors");

// const { autoFetchProducts, autoFetchCategories } = require("../../services"); // Шлях до функції оновлення з YML-файла

// const { YML_FILE } = process.env;

// const ymlFilePath = YML_FILE;

// // const updateDatabase = async () => {
// //   try {
// //     await autoFetchCategories(ymlFilePath);
// //     await autoFetchProducts(ymlFilePath);
// //     console.log(`${"DATABASE UPDATED SUCCESSFULLY"}`.cyan);
// //   } catch (error) {
// //     console.error("Error updating database:", error);
// //   }
// // };

// const updateDatabase = async (req, res) => {
//   console.log(req.query.update);
//   console.log("UPDATE DATABASE".magenta);

//   if (req.query.update === "category") {
//     await autoFetchCategories(ymlFilePath);
//   }

//   if (req.query.update === "product") {
//     await autoFetchProducts(ymlFilePath);
//   }
//   // Оновлюємо категорії та передаємо функцію для оновлення продуктів
//   if (!req.query.update) {
//     await autoFetchCategories(ymlFilePath, () => {
//       autoFetchProducts(ymlFilePath);
//     });
//   }
// };

// setInterval(async () => {
//   updateDatabase();
// }, 600000);
// // updateDatabase();
// module.exports = { updateDatabase: ctrlWrapper(updateDatabase) };

const { ctrlWrapper } = require("../../helpers");
require("colors");

const { autoFetchProducts, autoFetchCategories } = require("../../services");
const { YML_FILE } = process.env;

const ymlFilePath = YML_FILE;

const updateDatabase = async (req, res) => {
  try {
    console.log("UPDATE DATABASE".magenta);

    switch (req && req.query && req.query.update) {
      case "category":
        await autoFetchCategories(ymlFilePath);
        res.json({
          status: "success",
          message: "Базу даних категорій оновлено успішно!",
        });
        break;

      case "product":
        await autoFetchProducts(ymlFilePath);
        res.json({
          status: "success",
          message: "Базу даних товарів оновлено успішно!",
        });
        break;

      default:
        // Оновлюємо категорії та передаємо функцію для оновлення продуктів
        await autoFetchCategories(ymlFilePath, () => {
          autoFetchProducts(ymlFilePath);
        });
        if (res) {
          res.json({
            status: "success",
            message: "Базу даних оновлено успішно!",
          });
        }
        break;
    }
  } catch (error) {
    if (res) {
      res.status(500).json({ message: "Error updating database:" });
    } else {
      console.error("Error updating database:", error);
    }
  }
};

setInterval(async () => {
  updateDatabase();
}, 600000);

module.exports = { updateDatabase: ctrlWrapper(updateDatabase) };
