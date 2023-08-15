const Order = require("../../models/orders");
// const HttpError = require("../../helpers");

const { ctrlWrapper } = require("../../utils");

const addOrder = async (req, res) => {
  const webhookData = req.body; // Отримайте всі дані вебхуку

  console.log(webhookData.data.id);

  try {
    // Спробуйте знайти існуючу заявку за певним ідентифікатором, наприклад, за id
    const existingOrder = await Order.findOne({
      "data.id": webhookData.data.id,
    });

    if (existingOrder) {
      // Якщо заявка знайдена, оновіть її поля, включаючи статус
      existingOrder.data.statusId = webhookData.data.statusId;
      await existingOrder.save(); // Збережіть зміни
      res.status(200).json(existingOrder); // Поверніть оновлену заявку
    } else {
      // Якщо заявка не знайдена, створіть нову заявку
      const newOrder = await Order.create(webhookData);
      res.status(201).json(newOrder); // Поверніть створений об'єкт у відповідь
    }
  } catch (error) {
    console.error("Помилка під час збереження даних:", error);
    res.status(500).json({ error: "Виникла помилка" });
  }
};

module.exports = {
  addOrder: ctrlWrapper(addOrder),
};
