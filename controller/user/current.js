const current = async (req, res) => {
  const { _id, email, firstName, lastName, birthday, phone, favoriteOrders } =
    req.user;
  const accessToken = req.token;

  res.status(200).json({
    accessToken,
    user: {
      _id,
      email,
      firstName,
      lastName,
      birthday,
      phone,
      favoriteOrders,
    },
  });
};

module.exports = { current };
