const Order = require("../../models/orders");
// const HttpError = require("../../helpers");

const { ctrlWrapper } = require("../../utils");

// const addOrder = async (req, res) => {
//   const {
//     owner,
//     customerName,
//     customerLocation,
//     products,
//     customerPhone,
//     priceAll,
//   } = req.body;

//   const data = await Order.create({
//     customerName,
//     customerLocation,
//     products,
//     customerPhone,
//     priceAll,
//     owner,
//   });
//   if (!data) {
//     throw HttpError(400);
//   }
//   res.status(201).json(owner);
// };

const addOrder = async (req, res) => {
  const webhookData = req.body; // Отримайте всі дані вебхуку

  try {
    const newOrder = await Order.create(webhookData); // Збережіть дані в базі даних
    res.status(201).json(newOrder); // Поверніть створений об'єкт у відповідь
  } catch (error) {
    console.error("Помилка під час збереження даних:", error);
    res.status(500).json({ error: "Виникла помилка" });
  }
};

module.exports = {
  addOrder: ctrlWrapper(addOrder),
};
