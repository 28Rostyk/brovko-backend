const axios = require("axios");
const { PRODUCT_PATH } = process.env;

async function deleteProducts(body) {
  const url = PRODUCT_PATH;
  const headers = { "Content-Type": "application/json" };

  const response = await axios.post(url, body, { headers });

  return response.data;
}

module.exports = { deleteProducts };
