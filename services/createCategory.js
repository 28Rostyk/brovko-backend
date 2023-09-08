const axios = require("axios");

const { ADD_CATEGORY_PATH } = process.env;

async function createCategory(body) {
  try {
    const url = ADD_CATEGORY_PATH;
    const headers = { "Content-Type": "application/json" };
    const { id, name } = body.category[0];

    const response = await axios.post(url, body, { headers });
    return {
      message: `Категорія "${name}" з ID(${id}) успішно додана до SalesDrive.`,
      data: response.data,
    };
  } catch (error) {
    console.log("Error in createCategory:", error);
  }
}

module.exports = { createCategory };
