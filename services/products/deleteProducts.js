const axios = require("axios");
const { PRODUCT_PATH } = process.env;

async function deleteProducts(body) {
  const url = PRODUCT_PATH;
  const headers = { "Content-Type": "application/json" };

  const response = await axios.post(url, body, { headers });

  // console.log(
  //   `${"RESPONSE DATA IN DELETE >> :"}`.blue,
  //   JSON.parse(response.config.data)
  // );

  return response.data;
}

module.exports = { deleteProducts };
