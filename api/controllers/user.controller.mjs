import User from "../models/user.model.mjs";

const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next({ status: 401, message: "Unauthorized User" });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          dateOfBirth: req.body.dateOfBirth,
          mobile: req.body.mobile,
          gender: req.body.gender,
          country: req.body.country,
          state: req.body.state,
          city: req.body.city,
        },
      },
      { new: true }
    );
    const { password: updatedUserPassword, ...rest } = updatedUser._doc;
    return res.status(200).json({ message: "Updated User", user: rest });
  } catch (err) {
    console.error("Error occurred in updating user", err);
    return next({
      statusCode: 500,
      message: "Error occurred in updating user",
    });
  }
};

export default updateUser;
