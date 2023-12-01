const { User } = require("../../models");

const getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.find({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Not found user with this email" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error getting user by email:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getUserByEmail };
