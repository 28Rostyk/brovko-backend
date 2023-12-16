const cloudinary = require("cloudinary").v2;

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET_KEY } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET_KEY,
});

const sendInCloudinary = async (tempUpload, filename) => {
  const cloudinaryResponse = await cloudinary.uploader.upload(tempUpload, {
    folder: "reviews",
    public_id: `${filename}`,
    width: 250,
    height: 250,
    crop: "fill",
  });
  return cloudinaryResponse;
};

module.exports = { sendInCloudinary };
