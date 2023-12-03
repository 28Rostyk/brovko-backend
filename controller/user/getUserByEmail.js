const { User } = require("../../models");

const getUserByEmail = async (req, res) => {
  const { email } = req.query;

  try {
    const [data] = await User.find({ email });

    if (!data) {
      return res
        .status(404)
        .json({ message: "Not found user with this email" });
    }

    return res.status(200).json({ user: data });
  } catch (error) {
    console.error("Error getting user by email:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getUserByEmail };
