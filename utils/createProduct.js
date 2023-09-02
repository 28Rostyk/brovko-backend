const axios = require("axios");

const URL_PATH = process.env.ADD_PRODUCT_PATH;

async function createProduct(requestBody) {
  const url = URL_PATH;
  const headers = { "Content-Type": "application/json" };
  const body = requestBody;

  try {
    const response = await axios.post(url, body, { headers });
    console.log("Post request response:", response.data);
    return response.data;
  } catch (error) {
    console.log("Error in createProject:", error.message);
  }
}

module.exports = { createProduct };
