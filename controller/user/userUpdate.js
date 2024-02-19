const { User } = require("../../models");

const { HttpError } = require("../../helpers");

const userUpdate = async (req, res) => {
  console.log("req.body", req.body);
  console.log("req.body.id", req.body.id);
  const user = await User.findById(req.body.id);
  console.log("user", user);

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

  console.log("updatedUser :>> ", updatedUser);

  res.status(201).json(updatedUser);
};

module.exports = { userUpdate };
