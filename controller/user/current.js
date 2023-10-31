const current = async (req, res) => {
  const user = req.user;
  const accessToken = req.token;

  res.status(200).json({
    accessToken,
    user,
  });
};

module.exports = { current };
