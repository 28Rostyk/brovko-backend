const fs = require("fs/promises");
const path = require("path");
const cloudinary = require("cloudinary").v2;

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET_KEY } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET_KEY,
});

const { User } = require("../../models");
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatars = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, filename } = req.file;
  const avatarName = `${_id}${filename}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.mkdir(avatarsDir, { recursive: true });

  try {
    await fs.rename(tempUpload, resultUpload);
    const cloudinaryResponse = await cloudinary.uploader.upload(resultUpload, {
      folder: "avatars",
      public_id: avatarName,
      width: 250,
      height: 250,
      crop: "fill",
    });
    const avatarURL = cloudinaryResponse.secure_url;
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    console.error("Error updating avatar:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { updateAvatars };
