const bcrypt = require("bcryptjs");

const { User } = require("../../models");

const { HttpError } = require("../../helpers");

const updateUserStatus = async (req, res) => {
  const { email, password, _id, status } = req.body;

  // console.log(status);

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

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
