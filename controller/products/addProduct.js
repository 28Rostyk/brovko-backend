const { ctrlWrapper } = require("../../helpers");
const { createProduct } = require("../../services");
const { updateDatabase } = require("../../services/updateDatabase");
const { sendInCloudinary } = require("../../services");
const { clearTemp } = require("../../services");

const addProduct = async (req, res) => {
  try {
    const requestBodyObject = JSON.parse(req.body.requestBody);
    const { images } = requestBodyObject.product[0];
    const productURLs = [];

    if (req.files && req.files.length > 0) {
      for (const item of req.files) {
        if (item instanceof Object) {
          const { path: tempUpload, filename } = item;
          const cloudinaryResponse = await sendInCloudinary(
            tempUpload,
            filename
          );
          productURLs.push(cloudinaryResponse.secure_url);
        } else if ("url" in item) {
          productURLs.push(item.url);
        }
      }
    }

    if (images && images.length > 0) {
      for (const item of images) {
        productURLs.push(item);
      }
    }

    if (productURLs.length) {
      const imagesWithFullsize = productURLs.map((url, index) => ({
        fullsize: url,
        thumbnail: index,
      }));
      requestBodyObject.product[0].images = imagesWithFullsize;
    }

    const update = req.query.update;

    const response = await createProduct(requestBodyObject);

    await updateDatabase(update);
    await clearTemp();
    res.status(201).json({
      status: response.data.status,
      message: response.message,
    });
  } catch (error) {
    console.log("Error in Controller: ", error.message);
    res.json({ message: error.message });
  }
};

module.exports = { addProduct: ctrlWrapper(addProduct) };
