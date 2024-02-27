const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const { updateForUser } = require("../../helpers/updateForUser");

const userUpdate = async (req, res) => {
  try {
    console.log("req.body", req.body);
    console.log("req.body.id", req.body.id);

    const user = await User.findById(req.body.id);

    if (!user) {
      throw HttpError(401, "User is not found");
    }

    const body = req.body;
    body.name = body.firstName + " " + body.lastName;

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { ...body },
      { new: true }
    );

    await updateForUser(user._id, updatedUser);

    res.status(201).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
};

module.exports = { userUpdate };
