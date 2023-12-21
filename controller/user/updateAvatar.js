const { sendInCloudinary, clearTemp } = require("../../services");

const { User } = require("../../models");

const updateAvatars = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, filename } = req.file;
  const avatarName = `${_id}${filename}`;

  try {
    const cloudinaryResponse = await sendInCloudinary(tempUpload, avatarName);

    const avatarURL = cloudinaryResponse.secure_url;
    await User.findByIdAndUpdate(_id, { avatarURL });

    await clearTemp(tempUpload);
    // await clearTemp();

    res.json({
      avatarURL,
    });
  } catch (error) {
    console.error("Error updating avatar:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { updateAvatars };
