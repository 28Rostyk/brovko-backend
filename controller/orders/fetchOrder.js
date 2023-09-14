const { Order } = require("../../models");

const { ctrlWrapper } = require("../../helpers");

const fetchOrder = async (req, res) => {
  const webhookData = req.body;

  try {
    const existingOrder = await Order.findOne({
      "data.id": webhookData.data.id,
    });

    if (existingOrder) {
      Object.assign(existingOrder, webhookData);
      await existingOrder.save();
      res.status(200).json(existingOrder);
    } else {
      const newOrder = new Order(webhookData);
      const savedOrder = await newOrder.save();
      res.status(201).json(savedOrder);
    }

    const findOneAndDelete = webhookData.meta.fields.statusId.options.find(
      (item) => item.value === 16
    );

    // Додаємо цей блок коду для видалення за статусом
    if (findOneAndDelete) {
      const deletedOrder = await Order.findOneAndDelete({
        "data.id": webhookData.data.id,
      });

      if (deletedOrder) {
        console.log("Замовлення було видалено зі статусом 'Видалений'");
      }
    }
  } catch (error) {
    console.error("Помилка під час збереження даних:", error);
    res.status(500).json({ error: "Виникла помилка" });
  }
};

module.exports = {
  fetchOrder: ctrlWrapper(fetchOrder),
};
