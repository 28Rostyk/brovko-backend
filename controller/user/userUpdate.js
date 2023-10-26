const { User } = require("../../models");

const { HttpError } = require("../../helpers");

const userUpdate = async (req, res) => {
  const {
    firstName,
    lastName,
    middleName,
    birthday,
    phone,
    email,
    street,
    buildingNumber,
    flat,
  } = req.body;
  console.log("req.body", req.body);
  const userId = req.params.id;

  const user = await User.findById(userId);
  console.log("user", user);

  if (!user) {
    throw HttpError(401, "User is not found");
  }

  await User.findByIdAndUpdate(user._id, {
    firstName,
    lastName,
    middleName,
    birthday,
    phone,
    email,
    street,
    buildingNumber,
    flat,
  });

  res.status(201).json({
    user: {
      firstName,
      lastName,
      middleName,
      birthday,
      phone,
      email,
      street,
      buildingNumber,
      flat,
    },
  });
};

module.exports = { userUpdate };
