const { User } = require("../../models");

const logout = async (req, res) => {
  const { _id } = req.user;
  console.log("req.user", req.user);
  await User.findByIdAndUpdate(_id, { accessToken: "", refreshToken: "" });

  res.status(204).json({
    message: "No Content",
  });
};

module.exports = { logout };
