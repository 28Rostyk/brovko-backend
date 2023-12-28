// const { ctrlWrapper } = require("../../helpers");
// require("colors");

const { autoFetchProducts, autoFetchCategories } = require("../../services");

const { YML_FILE } = process.env;

const ymlFilePath = YML_FILE;

// const updateDatabase = async (update) => {
//   try {
//     console.log("UPDATE DATABASE".magenta);

//     switch (update) {
//       case "category":
//         await autoFetchCategories(ymlFilePath);
//         // res.json({
//         //   status: "success",
//         //   message: "Базу даних категорій оновлено успішно!",
//         // });
//         break;

//       case "product":
//         await autoFetchProducts(ymlFilePath);
//         // res.json({
//         //   status: "success",
//         //   message: "Базу даних товарів оновлено успішно!",
//         // });
//         break;

//       default:
//         // Оновлюємо категорії та передаємо функцію для оновлення продуктів
//         await autoFetchCategories(ymlFilePath, () => {
//           autoFetchProducts(ymlFilePath);
//         });
//         // if (res) {
//         //   res.json({
//         //     status: "success",
//         //     message: "Базу даних оновлено успішно!",
//         //   });
//         // }
//         break;
//     }
//   } catch (error) {
//     // if (res) {
//     //   res.status(500).json({ message: "Error updating database:" });
//     // } else {
//     //   console.error("Error updating database:", error);
//     // }
//   }
// };

// // setInterval(async () => {
// //   updateDatabase();
// // }, 600000);

const updateDatabase = async (update, fetch) => {
  // console.log("FETCH IN UPDATE-DATABASE".bgBlue.yellow, fetch);
  // console.log("UPDATE IN UPDATE-DATABASE".bgBlue.yellow, update);
  try {
    console.log("UPDATE DATABASE".magenta);

    switch (update) {
      case "category":
        if (fetch) {
          console.log("== #case 1# category updating with response ==".bgBlue);
          const updatedCategories = await autoFetchCategories(
            ymlFilePath,
            null,
            {
              response: true,
            }
          );

          return updatedCategories;
        } else {
          console.log(
            "== #case 2# category updating with no response ==".bgBlue
          );
          await autoFetchCategories(ymlFilePath);
          break;
        }

      case "product":
        await autoFetchProducts(ymlFilePath);
        console.log("AUTO FETCH PRODUCT".bgMagenta);
        break;

      default:
        console.log("=== CASE 3 ===".bgMagenta);
        // Оновлюємо категорії та передаємо функцію для оновлення продуктів
        await autoFetchCategories(ymlFilePath);
        await autoFetchProducts(ymlFilePath);
        break;
    }

    console.log("DATABASE IS UPDATED".bgGreen);
  } catch (error) {
    console.error(`Error updating database:`, error);
  }
};

setInterval(async () => {
  updateDatabase();
}, 600000);

module.exports = { updateDatabase };
