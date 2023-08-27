const jwt = require("jsonwebtoken");

const User = require("../../models/user");

const { SECRET_KEY } = process.env;

const googleAuth = async (req, res) => {
  console.log("req", req);
  const { _id: id } = req.user;

  const payload = {
    id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  const user = await User.findByIdAndUpdate(id, { token });
  console.log("user", user);
  res.redirect(`http://localhost:3000?token=${token}`);
};

module.exports = googleAuth;
