const { User } = require("../../models");

const updateUserStatus = async (req, res) => {
  const { _id, status } = req.query;

  try {
    await User.findByIdAndUpdate(_id, { status });
    res.status(200).json({
      _id,
      status,
    });
  } catch (error) {
    console.error("Error getting user by email:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { updateUserStatus };
