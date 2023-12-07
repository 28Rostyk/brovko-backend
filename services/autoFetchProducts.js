const axios = require("axios");
const xml2js = require("xml2js");
const he = require("he");

const { Products } = require("../models/products");

const { YML_FILE } = process.env;

const ymlFilePath = YML_FILE;

console.log(ymlFilePath);
let isUpdating = false;

async function updateProduct(offerData) {
  const existingOffer = await Products.findOne({ id: offerData.id });

  if (!existingOffer) {
    // Додати новий товар, якщо не існує
    const newOffer = new Products({
      id: offerData.id || "",
      currencyId: offerData.currencyId || "",
      categoryId: offerData.categoryId || "",
      vendor: offerData.vendor || "",
      vendorCode: offerData.vendorCode || "",
      barcode: offerData.barcode || "",
      price: offerData.price,
      name: offerData.name,
      description: sanitizeAndEncode(offerData.description) || "",
      url: offerData.url || "",
      picture: offerData.picture || "",
      keywords: offerData.keywords || "",
      available: offerData.available || false,
      inStock: offerData.inStock || false,
      note: sanitizeAndEncode(offerData.note) || "",
    });

    await newOffer.save();
    console.log("Added:", newOffer.id);
  } else {
    // Порівняти змінені поля і оновити тільки якщо є зміни
    const fieldsToCompare = [
      "price",
      "name",
      "description",
      "currencyId",
      "categoryId",
      "picture",
      "vendor",
      "vendorCode",
      "barcode",
      "url",
      "keywords",
      "available",
      "inStock",
      "note",
      // ... інші поля для порівняння
    ];

    let hasChanges = false;

    for (const field of fieldsToCompare) {
      if (existingOffer[field] !== offerData[field]) {
        existingOffer[field] = offerData[field];
        hasChanges = true;
      }
    }

    if (hasChanges) {
      const updatedOffer = new Products(existingOffer); // Створення нового об'єкту Mongoose Document
      await updatedOffer.save();
      console.log("Updated product:", updatedOffer.id);
    } else {
      console.log("No changes for:", existingOffer.id);
    }
  }
}

const initialProductCount = 0; // Початкова кількість продуктів

async function autoFetchProducts(url) {
  try {
    const response = await axios.get(url);
    const xml = response.data;

    const parser = new xml2js.Parser();
    parser.parseString(xml, async (err, result) => {
      if (err) {
        console.error(err);
        return;
      }

      const offers = result.yml_catalog.shop[0].offers[0].offer;
      // Отримати ідентифікатори товарів з YML-файлу
      const ymlProductIds = offers.map((offer) => offer.$.id);

      // Отримати ідентифікатори товарів з бази даних
      const dbProductIds = await Products.find({}, "id");

      // Визначити ідентифікатори для видалення
      const productsToDelete = dbProductIds.filter(
        (dbProduct) => !ymlProductIds.includes(dbProduct.id)
      );

      // Видалити відповідні товари з бази даних
      for (const productToDelete of productsToDelete) {
        await Products.findOneAndDelete({ id: productToDelete.id });
        console.log("Deleted:", productToDelete.id);
      }

      // initialProductCount = offers.length; // Зберегти початкову кількість продуктів

      for (const offerData of offers) {
        const productId = offerData.$.id;

        // Перевірити, чи продукт вже був оброблений

        const note = offerData.note ? offerData.note[0] : "";

        const description = offerData.description
          ? offerData.description[0]
          : "";

        await updateProduct({
          id: productId,
          currencyId: offerData.currencyId ? offerData.currencyId[0] : "",
          categoryId: offerData.categoryId ? offerData.categoryId[0] : "",
          vendor: offerData.vendor ? offerData.vendor[0] : "",
          vendorCode: offerData.vendorCode ? offerData.vendorCode[0] : "",
          barcode: offerData.barcode ? offerData.barcode[0] : "",
          price: parseFloat(offerData.price[0]),
          name: offerData.name[0],
          description: sanitizeAndEncode(description),
          url: offerData.url ? offerData.url[0] : "",
          picture: offerData.picture || "",
          keywords: offerData.keywords ? offerData.keywords[0] : "",
          available: offerData.available === "true",
          inStock: offerData.in_stock === "true",
          note: sanitizeAndEncode(note),
        });

        // Ваша обробка продуктів тут
      }
    });

    // ТУТ БУВ БАГ = базаданих оновлювалась по зацикленому колу. !!!!
    // Тут порівняння і оновлення бази даних
    // const currentProductCount = await Products.countDocuments(); // Поточна кількість продуктів в базі

    // if (currentProductCount > initialProductCount) {
    //   await updateDatabase(); // Оновити базу даних
    // }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Оновлювати базу даних за вказаним URL
async function updateDatabase() {
  console.log("UPDATE DATABASE".magenta);
  await autoFetchProducts(ymlFilePath);
}

// Оновлювати базу даних за вказаним URL тільки якщо є зміни в XML
setInterval(async () => {
  if (!isUpdating) {
    isUpdating = true; // Встановити прапорець в true перед початком оновлення
    await updateDatabase();
    isUpdating = false; // Позначити, що оновлення завершено
  }
}, 600000);

function removeHtmlTags(html) {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
}

function sanitizeAndEncode(text) {
  const withoutHtmlTags = removeHtmlTags(text);
  const decodedText = he.decode(withoutHtmlTags);
  return decodedText;
}

module.exports = { autoFetchProducts };
