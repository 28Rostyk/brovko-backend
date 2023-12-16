const { sendInCloudinary } = require("../services");

const changeImage = async (body) => {
  console.log("body", body.product[0].images);
  const { path: tempUpload, fullsize } = body.product[0].images[0];
  console.log("fullsize", fullsize);

  try {
    const cloudinaryResponse = await sendInCloudinary(tempUpload, fullsize);

    const fullsizeURL = cloudinaryResponse.secure_url;
    body.product[0].images[0].fullsize = fullsizeURL;
    console.log("req.body2", body);
    return body;
  } catch (error) {
    console.error("Error updating image in cloudinary:", error);
    throw new Error("Внутренняя ошибка сервера");
  }
};

module.exports = { changeImage };
