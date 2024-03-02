const { ctrlWrapper } = require("../../helpers");
const {
  getAllProductsFromDB,
  getProductsByCategoryFromDB,
  getProductsByKeywordFromDB,
} = require("../../services");

const getProducts = async (req, res) => {
  const { search = "", categoryId = "all" } = req.query; // Тут витягуємо дані лише для перевірки умов, що визначитись, який алгоритм сортування викликати далі

  if (search === "" && (categoryId === "all" || categoryId === "")) {
    // console.log("CASE 1");
    const products = await getAllProductsFromDB(req.query);
    res.status(200).json(products);
  } else if (search !== "" && categoryId === "all") {
    // console.log("CASE 2");
    const products = await getProductsByKeywordFromDB(req.query);
    res.status(200).json(products);
  } else if (search === "" && categoryId !== "all") {
    // console.log("CASE 3");
    const products = await getProductsByCategoryFromDB(req.query);
    res.status(200).json(products);
  } else {
    console.log(
      "None of the conditions in the getProducts controller were satisfied"
        .bgRed.brightYellow
    );
  }
};

module.exports = {
  getProducts: ctrlWrapper(getProducts),
};
