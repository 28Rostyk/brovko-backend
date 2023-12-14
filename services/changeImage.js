const cloudinary = require("cloudinary").v2;

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET_KEY } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET_KEY,
});

const changeImage = async (body) => {
  console.log("body", body.product[0].images);
  const { path: tempUpload, fullsize } = body.product[0].images[0];
  console.log("fullsize", fullsize);

  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(tempUpload, {
      folder: "products",
      public_id: fullsize,
      width: 250,
      height: 250,
      crop: "fill",
    });

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
