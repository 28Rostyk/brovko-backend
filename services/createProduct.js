const axios = require("axios");

const { ADD_PRODUCT_PATH } = process.env;

async function createProduct(body) {
  try {
    const url = ADD_PRODUCT_PATH;
    // const url = "https://brovko.salesdrive.me/product-handler/";
    const headers = { "Content-Type": "application/json" };
    const { id, name } = body.product[0];

    const response = await axios.post(url, body, { headers });

    return {
      message: `Товар "${name}" з ID(${id}) успішно доданий до SalesDrive.`,
      data: response.data,
    };
  } catch (error) {
    console.log("Error in createProject:", error);
  }
}

module.exports = { createProduct };
