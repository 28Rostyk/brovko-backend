const { ctrlWrapper } = require("../utils");

const axios = require("axios");
const xml2js = require("xml2js");

const util = require("util");
const parseStringPromise = util.promisify(xml2js.parseString);
// const { query } = require("express");

const getProducts = async (req, res) => {
  const url =
    "https://brovko.salesdrive.me/export/yml/export.yml?publicKey=aYcKPKGzZgqwrGsQ2bXXErzE4d8T-YXxJOmKKoayHI84wLVjBm1h_LWz632yguyQ3S07J9mdTZx";
  //   try {
  //     const response = await axios.get(url);
  //     const xmlData = response.data;

  //     const jsonData = await parseStringPromise(xmlData);
  //     res.json(jsonData);
  //   } catch (error) {
  //     console.error("Помилка при отриманні даних:", error);
  //     res.status(500).send("Помилка сервера");
  //   }
  const response = await axios.get(url);
  const xmlData = response.data;
  const jsonData = await parseStringPromise(xmlData);
  res.json(jsonData);

  //--------Pagination only offers-------------

  // const response = await axios.get(url);
  // const xmlData = response.data;

  // const jsonData = await parseStringPromise(xmlData);
  // const offers = jsonData.yml_catalog.shop[0].offers[0].offer;

  // // Отримання параметрів пагінації з запиту
  // const page = parseInt(req.query.page) || 1; // Номер сторінки, за замовчуванням 1
  // const limit = parseInt(req.query.limit) || 5; // Кількість елементів на сторінці, за замовчуванням 10

  // // Обчислення індексів початку і кінця елементів на поточній сторінці
  // const startIndex = (page - 1) * limit;
  // const endIndex = page * limit;

  // // Фільтрація елементів для поточної сторінки
  // const currentOffers = offers.slice(startIndex, endIndex);

  // // Побудова об'єкта з даними пагінації
  // const pagination = {
  //   currentPage: page,
  //   totalPages: Math.ceil(offers.length / limit),
  //   totalItems: offers.length,
  //   perPage: limit,
  // };

  // res.json({ offers: currentOffers, pagination });

  //--------Pagination only offers-------------
};

module.exports = {
  getProducts: ctrlWrapper(getProducts),
};
