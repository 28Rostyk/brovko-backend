const axios = require("axios");
const { PRODUCT_PATH } = process.env;

async function createProduct(body) {
  console.log("body into CreateProject :>> ".bgYellow, body.product[0]);
  try {
    const url = PRODUCT_PATH;
    const headers = { "Content-Type": "application/json" };
    const { id, name } = body.product[0];

    const bodyToSend = JSON.stringify(body);

    const response = await axios.post(url, bodyToSend, { headers });

    return {
      message: `Товар "${name}" з ID(${id}) успішно доданий до SalesDrive.`,
      data: response.data,
    };
  } catch (error) {
    console.log("Error in createProject:", error);
  }
}

module.exports = { createProduct };
