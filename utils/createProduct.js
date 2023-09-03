const axios = require("axios");

const { ADD_PRODUCT_PATH } = process.env;

async function createProduct(body) {
  try {
    const url = ADD_PRODUCT_PATH;
    const data = JSON.stringify(body);
    const headers = { "Content-Type": "application/json" };

    const response = await axios.post(url, data, { headers });
    return response;
  } catch (error) {
    console.log("Error in createProject:", error);
  }
}

module.exports = { createProduct };
