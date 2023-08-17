const Order = require("../../models/orders");
// const HttpError = require("../../helpers");

const { ctrlWrapper } = require("../../utils");

const addOrder = async (req, res) => {
  const webhookData = req.body;

  try {
    const existingOrder = await Order.findOne({
      "data.id": webhookData.data.id,
    });

    if (existingOrder) {
      // Замінюємо всі дані замовлення на нові дані
      Object.assign(existingOrder, webhookData);
      await existingOrder.save();
      res.status(200).json(existingOrder);
    } else {
      // Створюємо новий об'єкт Order
      const newOrder = new Order(webhookData);

      // Зберігаємо нове замовлення
      const savedOrder = await newOrder.save();
      res.status(201).json(savedOrder);
    }
  } catch (error) {
    console.error("Помилка під час збереження даних:", error);
    res.status(500).json({ error: "Виникла помилка" });
  }
};

module.exports = {
  addOrder: ctrlWrapper(addOrder),
};
