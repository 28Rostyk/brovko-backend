const { User } = require("../../models");

// const { HttpError } = require("../../helpers");

const updateUserStatus = async (req, res) => {
  const { _id, status } = req.query;

  // const user = await User.findById(_id);

  // if (!user) {
  //   throw HttpError(401, "User is not found");
  // }

  try {
    const updatedStatus = await User.findByIdAndUpdate(
      _id,
      { status },
      { new: true }
    );

    res.status(201).json(updatedStatus);
  } catch (error) {
    console.error("Error getting user by email:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { updateUserStatus };
