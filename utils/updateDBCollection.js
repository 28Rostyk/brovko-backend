// const { Reviews } = require("../models");

// зразок оновлень :
// const reviewUpdates = {
//   "comments.$[].text.$[].status": {
//     approved: true,
//     approvedBy: { userId: "653f9dd2a3ad1f8599a1c3a9" },
//     approvedAt: new Date(),
//   },
// };

async function addDataToDBCollection(Model, updates) {
  try {
    // Оновлення всіх документів у колекції
    const { modifiedCount, matchedCount } = await Model.updateMany({}, updates);

    console.log("Updated documents :".bgBlue, `${modifiedCount}`.brightBlue);
    console.log("Matched documents :".bgBlue, `${matchedCount}`.brightBlue);

    // console.log("Оновлено документів:".bgGreen, updateResult.nModified);
  } catch (error) {
    console.error("Помилка при оновленні колекції:", error);
  }
}

module.exports = { addDataToDBCollection };
