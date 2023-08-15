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
  const webhookData = req.body;

  try {
    const orderId = webhookData.id;
    const updatedData = webhookData.data;

    // Знайти заявку за ID
    let existingOrder = await Order.findOne({ id: orderId });

    if (!existingOrder) {
      // Якщо заявка не знайдена, то створити нову заявку
      existingOrder = new Order({
        id: orderId,
        data: webhookData,
      });

      await existingOrder.save();
      return res.status(201).json(existingOrder);
    }

    // Якщо заявка знайдена, оновити дані
    existingOrder.data = { ...existingOrder.data, ...updatedData };
    await existingOrder.save();

    res.status(200).json(existingOrder);
  } catch (error) {
    console.error("Помилка при обробці вебхуку:", error);
    res.status(500).json({ error: "Виникла помилка" });
  }
  // const webhookData = req.body; // Отримайте всі дані вебхуку

  // try {
  //   const newOrder = await Order.create(webhookData); // Збережіть дані в базі даних
  //   res.status(201).json(newOrder); // Поверніть створений об'єкт у відповідь
  // } catch (error) {
  //   console.error("Помилка під час збереження даних:", error);
  //   res.status(500).json({ error: "Виникла помилка" });
  // }
};

module.exports = {
  addOrder: ctrlWrapper(addOrder),
};
