// @desc SignIn
// @route POST /api/signin
// @access public
export const signinAPI = async (req, res) => res.status(200).json({ message: 'Signin API' });

// @desc SignUp
// @route POST /api/signup
// @access public
export const signupAPI = async (req, res) => res.status(200).json({ message: 'Signup API' });