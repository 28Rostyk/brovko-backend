const current = async (req, res) => {
  const { _id, email, name, birthday, phone, favoriteOrders } = req.user;
  const token = req.token;

  res.status(200).json({
    token,
    user: {
      _id,
      email,
      name,
      birthday,
      phone,
      favoriteOrders,
    },
  });
};

module.exports = current;
