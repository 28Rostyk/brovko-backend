const axios = require("axios");
const xml2js = require("xml2js");
const { Category } = require("../models"); // Шлях до моделі Category
// const { getCategories } = require("../controller");

// const { YML_FILE } = process.env;
// const ymlFilePath = YML_FILE;

// const initialOption = { response: false };
let isUpdating = false;

async function autoFetchCategories(url, options = { response: false }) {
  if (isUpdating) {
    // console.log("Update already in progress, skipping...".red);
    return;
  }

  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    // console.log("== categories updating".magenta);
    try {
      isUpdating = true;
      let updatedCategories;

      const response = await axios.get(url);
      const xml = response.data;

      const parser = new xml2js.Parser();
      parser.parseString(xml, async (err, result) => {
        if (err) {
          console.error(err);
          isUpdating = false;
          return;
        }

        const categories = result.yml_catalog.shop[0].categories[0].category;
        const newYmlCategories = categories.map((categoryData) => ({
          id: categoryData.$.id,
          name: categoryData._,
          parentId: categoryData.$.parentId || "",
        }));

        for (const newYmlCategory of newYmlCategories) {
          let existingCategory = await Category.findOne({
            id: newYmlCategory.id,
          });

          if (!existingCategory) {
            existingCategory = await Category.findOne({
              name: newYmlCategory.name,
            });
          }

          // if (!existingCategory) {
          //   existingCategory = await Category.findOne({
          //     parentId: newYmlCategory.parentId,
          //   });
          // }

          if (existingCategory) {
            existingCategory.id = newYmlCategory.id;
            existingCategory.name = newYmlCategory.name;
            existingCategory.parentId = newYmlCategory.parentId;
            await existingCategory.save();
            // console.log("Updated category:", `${newYmlCategory.id}`.yellow);
          } else {
            const category = new Category({
              id: newYmlCategory.id,
              name: newYmlCategory.name,
              parentId: newYmlCategory.parentId,
            });
            await category.save();
            // console.log("Added category:", `${newYmlCategory.id}`.green);
          }
        }

        const existingCategoryIds = newYmlCategories.map((c) => c.id);
        const removedCategories = await Category.find({
          id: { $nin: existingCategoryIds },
        });

        for (const removedCategory of removedCategories) {
          await Category.deleteOne({ _id: removedCategory._id });
          // console.log("Deleted category:", `${removedCategory.id}`.red);
        }

        if (options && options.response === true) {
          updatedCategories = await Category.find(
            {},
            "-createdAt -updatedAt -_id"
          );
        }
        resolve(updatedCategories);
        isUpdating = false;
      });
    } catch (error) {
      // console.log("Error:".red, error);
      reject(error);
      isUpdating = false;
    }
  });
}

// setInterval(async () => {
//   await autoFetchCategories(ymlFilePath);
// }, 600000);

module.exports = { autoFetchCategories };
