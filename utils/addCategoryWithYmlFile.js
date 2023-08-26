const axios = require("axios");
const xml2js = require("xml2js");
const { Category } = require("../models/caregory"); // Шлях до моделі Category

const { YML_FILE } = process.env;

const ymlFilePath = YML_FILE;

let isUpdating = false;

async function updateCategoriesFromYml(url) {
  if (isUpdating) {
    console.log("Update already in progress, skipping...");
    return;
  }

  try {
    isUpdating = true;

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

        if (existingCategory) {
          existingCategory.id = newYmlCategory.id;
          existingCategory.name = newYmlCategory.name;
          await existingCategory.save();
          console.log("Updated category:", newYmlCategory.id);
        } else {
          const category = new Category({
            id: newYmlCategory.id,
            name: newYmlCategory.name,
          });
          await category.save();
          console.log("Added category:", newYmlCategory.id);
        }
      }

      const existingCategoryIds = newYmlCategories.map((c) => c.id);
      const removedCategories = await Category.find({
        id: { $nin: existingCategoryIds },
      });

      for (const removedCategory of removedCategories) {
        await Category.deleteOne({ _id: removedCategory._id }); // Видалення категорії за _id
        console.log("Deleted category:", removedCategory.id);
      }

      isUpdating = false;
    });
  } catch (error) {
    console.error("Error:", error);
    isUpdating = false;
  }
}

setInterval(async () => {
  await updateCategoriesFromYml(ymlFilePath);
}, 600000);

module.exports = updateCategoriesFromYml;
