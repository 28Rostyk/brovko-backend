const axios = require("axios");

const URL_PATH = process.env.ADD_PRODUCT_PATH;

async function createProduct(requestBody) {
  const url = URL_PATH;
  const headers = { "Content-Type": "application/json" };

  try {
    const response = await axios.post(url, requestBody, { headers });
    console.log("Post request response:", response.data);
  } catch (error) {
    console.log("Error:", error.message);
  }
}

module.exports = { createProduct };
