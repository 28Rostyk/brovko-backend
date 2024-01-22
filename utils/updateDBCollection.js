// зразок оновлень :
// const reviewUpdates = {
//   $set: {
//     "comments.$[].status": {
//       approved: false,
//       approvedBy: { userId: "653f9dd2a3ad1f8599a1c3a9" },
//       approvedAt: new Date(),
//     },
//   },
// };

async function updateDBCollection(Model, updates) {
  try {
    // Оновлення всіх документів у колекції
    const updateResult = await Model.updateMany({}, updates);

    console.log("Оновлено документів:".bgGreen, updateResult.nModified);
  } catch (error) {
    console.error("Помилка при оновленні колекції:", error);
  }
}

module.exports = { updateDBCollection };
