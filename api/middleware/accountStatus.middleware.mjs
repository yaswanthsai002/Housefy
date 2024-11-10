import User from "../models/user.model.mjs";

const checkAccountStatus = async (req, res, next) => {
  try {
    const user = req.user
      ? await User.findById(req.user.id)
      : await User.findOne({ email: req.body.email });
    if (!user) {
      console.log('User Not Found', user);
      return res.status(404).json({ message: "User not found" });
    }

    if (user.status === "disabled") {
      console.log("User account is disabled", user);
      return res.status(403).json({ message: "Account is disabled" });
    }

    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

export default checkAccountStatus;
