import User from "../models/user.model.mjs";

const checkAccountStatus = async (req, res, next) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.status === "disabled") {
    return res.status(403).json({ message: "Account is disabled" });
  }

  next();
};

export default checkAccountStatus;
