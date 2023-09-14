const axios = require("axios");

const { ADD_ORDER_PATH } = process.env;

async function createOrder(body) {
  try {
    const url = ADD_ORDER_PATH;
    const headers = { "Content-Type": "application/json" };

    const response = await axios.post(url, body, { headers });

    return {
      message: "Замовлення успішно надіслано продавцю.",
      data: response.data,
    };
  } catch (error) {
    console.log("Error in createOrder:", error);
  }
}

module.exports = { createOrder };
