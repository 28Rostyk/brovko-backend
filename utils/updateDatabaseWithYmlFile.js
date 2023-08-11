const axios = require("axios");
const xml2js = require("xml2js");
const { Products } = require("../models/products");

const ymlFilePath =
  "https://brovko.salesdrive.me/export/yml/export.yml?publicKey=a77upGS-L672GGwbU3qiAGdHdAqGgbz33-hPkFBwQ5sS8IIHkH0I1gkANDFI7GW7";

console.log(ymlFilePath);

async function updateProduct(offerData) {
  //   console.log("Updating product:", offerData.$.id);
  //   const existingOffer = await Products.findOne({ id: offerData.$.id });
  //   if (existingOffer) {
  //     existingOffer.available = offerData.$.available === "true";
  //     existingOffer.in_stock = offerData.$.in_stock === "true";
  //     existingOffer.price = parseFloat(offerData.price[0]);
  //     existingOffer.name = offerData.name[0];
  //     existingOffer.description = offerData.description[0];
  //     existingOffer.url = offerData.url[0];
  //     existingOffer.picture = offerData.picture[0];
  //     existingOffer.keywords = offerData.keywords[0];
  //     await existingOffer.save();
  //     console.log("Product updated:", offerData.$.id);
  //   } else {
  //     // Create new offer
  const newOffer = new Products({
    id: offerData.$.id,
    // available: offerData.$.available === "true",
    // in_stock: offerData.$.in_stock === "true",
    price: parseFloat(offerData.price[0]),
    name: offerData.name[0],
    description: offerData.description[0],
    url: offerData.url ? offerData.url[0] : "",
    picture: offerData.picture ? offerData.picture[0] : "",
    keywords: offerData.keywords ? offerData.keywords[0] : "",
    // owner: userId,
  });
  await newOffer.save();
  console.log("Added:", newOffer);
}
// }

async function updateDatabaseWithYmlFile(url, userId) {
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
        const existingOffer = await Products.findOne({ id: offerData.$.id });

        if (!existingOffer) {
          // Якщо продукт з таким id не існує, то додати його
          await updateProduct(offerData, userId);
        }
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

// Оновлювати базу даних за вказаним URL кожні 10 хвилин
setInterval(async () => {
  await updateDatabaseWithYmlFile(ymlFilePath);
}, 10000);

module.exports = updateDatabaseWithYmlFile;
