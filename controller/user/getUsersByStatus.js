const { User } = require("../../models");

const getUsersByStatus = async (req, res) => {
  const { status, page = 1, perPage = 30 } = req.query;

  try {
    const skip = (page - 1) * perPage;
    const totalCount = await User.countDocuments({
      status: status,
    });
    const totalPages = Math.ceil(totalCount / perPage);

    const usersOfStatus = await User.find(
      { status: status },
      "-createdAt -updatedAt"
    )
      .skip(skip)
      .limit(perPage);

    if (!usersOfStatus || usersOfStatus.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    return res.json({
      totalPage: totalPages,
      totalItems: totalCount,
      perPage: perPage,
      currentPage: page,
      users: usersOfStatus,
    });
  } catch (error) {
    console.error("Error while fetching users:", error);
    return res.status(500).json({ error: "Error while fetching users" });
  }
};

module.exports = { getUsersByStatus };
