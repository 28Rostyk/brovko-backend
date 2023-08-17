const axios = require("axios");
const xml2js = require("xml2js");
const { Products } = require("../models/products");

const ymlFilePath =
  "https://brovko.salesdrive.me/export/yml/export.yml?publicKey=duoIZYyPUfXlQGLfqfbV_LeuIgGM24LscKdVt3tPQdf-3_fdJhXH9b68GrPsvbzU";
// "https://brovko.salesdrive.me/export/yml/export.yml?publicKey=a77upGS-L672GGwbU3qiAGdHdAqGgbz33-hPkFBwQ5sS8IIHkH0I1gkANDFI7GW7";

console.log(ymlFilePath);

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
      description: offerData.description,
      url: offerData.url || "",
      picture: offerData.picture || "",
      keywords: offerData.keywords || "",
      available: offerData.available || false,
      inStock: offerData.inStock || false,
    });

    await newOffer.save();
    console.log("Added:", newOffer.id);
  } else {
    // Порівняти змінені поля і оновити тільки якщо є зміни
    let hasChanges = false;

    if (existingOffer.price !== offerData.price) {
      existingOffer.price = offerData.price;
      hasChanges = true;
    }
    if (existingOffer.name !== offerData.name) {
      existingOffer.name = offerData.name;
      hasChanges = true;
    }
    if (existingOffer.description !== offerData.description) {
      existingOffer.description = offerData.description;
      hasChanges = true;
    }
    // Додайте інші поля для порівняння

    if (hasChanges) {
      await existingOffer.save();
      console.log("Updated:", existingOffer.id);
    } else {
      console.log("No changes for:", existingOffer.id);
    }
  }
}

async function updateDatabaseWithYmlFile(url) {
  try {
    const response = await axios.get(url);
    const xml = response.data;

    const parser = new xml2js.Parser();
    parser.parseString(xml, async (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      // console.log("XML parsed successfully");
      const offers = result.yml_catalog.shop[0].offers[0].offer;

      for (const offerData of offers) {
        const description = offerData.description
          ? offerData.description[0]
          : "";
        await updateProduct({
          id: offerData.$.id,
          currencyId: offerData.currencyId ? offerData.currencyId[0] : "",
          categoryId: offerData.categoryId ? offerData.categoryId[0] : "",
          vendor: offerData.vendor ? offerData.vendor[0] : "",
          vendorCode: offerData.vendorCode ? offerData.vendorCode[0] : "",
          barcode: offerData.barcode ? offerData.barcode[0] : "",
          price: parseFloat(offerData.price[0]),
          name: offerData.name[0],
          description: removeHtmlTags(description),
          url: offerData.url ? offerData.url[0] : "",
          picture: offerData.picture ? offerData.picture[0] : "",
          keywords: offerData.keywords ? offerData.keywords[0] : "",
          available: offerData.available === "true",
          inStock: offerData.in_stock === "true",
        });
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

// Оновлювати базу даних за вказаним URL
async function updateDatabase() {
  await updateDatabaseWithYmlFile(ymlFilePath);
}

// Оновлювати базу даних за вказаним URL тільки якщо є зміни в XML
setInterval(async () => {
  await updateDatabase();
}, 600000);

function removeHtmlTags(html) {
  return html.replace(/<\/?div>/g, "");
}

module.exports = updateDatabaseWithYmlFile;
