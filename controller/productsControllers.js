const { ctrlWrapper } = require("../utils");

const { Products } = require("../models/products");
const { HttpError } = require("../helpers/httpError");

const getProducts = async (req, res) => {
  const { page = 1, perPage = 10 } = req.query;

  try {
    const skip = (page - 1) * perPage;
    const totalCount = await Products.countDocuments();
    const totalPages = Math.ceil(totalCount / perPage);

    const products = await Products.find({}, "-createdAt -updatedAt")
      .skip(skip)
      .limit(perPage);

    res.json({
      totalPage: totalPages,
      totalItems: totalCount,
      perPage: perPage,
      currentPage: page,
      products: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

//   try {
//     const response = await axios.get(url);
//     const xmlData = response.data;
//     const jsonData = await parseStringPromise(xmlData);
//     res.json(jsonData);
//   } catch (error) {
//     console.error("Помилка при отриманні даних:", error);
//     res.status(500).send("Помилка сервера");
//   }
// const response = await axios.get(url);
// const xmlData = response.data;
// const jsonData = await parseStringPromise(xmlData);
// res.json(jsonData);
// --------Pagination only offers-------------
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
// --------Pagination only offers-------------
// };

const deleteContact = async (req, res, next) => {
  const { productId: id } = req.params;
  console.log(id);
  const result = await Products.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json({
    message: "Delete success",
  });
};

module.exports = {
  getProducts: ctrlWrapper(getProducts),
  deleteContact: ctrlWrapper(deleteContact),
};
