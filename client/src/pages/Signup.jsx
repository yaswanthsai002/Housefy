import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import facebookIcon from "/icons/facebook-icon.svg";
import signupBg from "/images/signup-bg.webp";
import signupBlurred from "/images/signup-blurred.webp";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import GoogleOAuth from "../components/GoogleOAuth";
const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [bgImageLoaded, setBgImageLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    const img = new Image();
    img.src = signupBg;
    img.onload = () => {
      setBgImageLoaded(true);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { password } = formData;
    const specialChars = /[~`!@#$%^&*()_\-+={}[\]:;"<>,.?/|]/;
    const numbers = /[0-9]/;
    const lowerCaseChars = /[a-z]/;
    const upperCaseChars = /[A-Z]/;

    if (password.length < 8 || password.length > 16) {
      toast.error("Password length must be between 8 and 16 characters");
      return;
    }
    if (!specialChars.test(password)) {
      toast.error("Password must contain at least one special character");
      return;
    }
    if (!numbers.test(password)) {
      toast.error("Password must contain at least one digit");
      return;
    }
    if (!lowerCaseChars.test(password)) {
      toast.error("Password must contain at least one lowercase letter");
      return;
    }
    if (!upperCaseChars.test(password)) {
      toast.error("Password must contain at least one uppercase letter");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("api/auth/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const jsonResponse = await response.json();
      if (!response.ok) {
        toast.error(jsonResponse.message);
        console.error("Error: ", jsonResponse.message);
        return;
      }
      toast.success("Registration Successful, Please sign in to continue");
      navigate("/signin");
    } catch (err) {
      console.error(err);
    } finally {
      setFormData({ firstName: "", lastName: "", email: "", password: "" });
      setLoading(false);
    }
  };

  return currentUser ? (
    <Navigate to="/" />
  ) : (
    <div
      className={`flex items-center justify-center min-h-[calc(100vh-64px)] bg-center bg-no-repeat bg-cover transition-all duration-500 ease-in-out ${
        bgImageLoaded ? "bg-signup" : "bg-placeholder"
      }`}
      style={{
        backgroundImage: `url(${bgImageLoaded ? signupBg : signupBlurred})`,
      }}
    >
      <div className="flex flex-col items-center justify-between w-3/4 lg:w-1/4 md:w-1/2 border-2 border-opacity-25 rounded-md backdrop-blur-[50px] md:py-8 py-4 md:gap-y-8 gap-y-4">
        <h1 className="text-2xl font-extrabold text-white md:text-4xl font-urbanist">
          Sign Up
        </h1>
        <form
          className="flex flex-col items-center justify-between w-[85%] gap-y-4"
          onSubmit={handleSignUp}
        >
          <div className="flex flex-col items-center justify-between w-full md:flex-row names-grp gap-x-4 gap-y-4">
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="w-full px-1 py-1 text-sm text-white bg-transparent border-b-2 outline-none md:py-2 md:w-1/2 placeholder:text-white caret-white md:text-base"
              placeholder="First Name"
              autoComplete="off"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="lastName"
              className="w-full px-1 py-1 text-sm text-white bg-transparent border-b-2 outline-none md:py-2 md:w-1/2 placeholder:text-white caret-white md:text-base"
              placeholder="Last Name"
              autoComplete="off"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full px-1 py-1 text-sm text-white bg-transparent border-b-2 outline-none md:py-2 placeholder:text-white caret-white md:text-base"
            placeholder="Enter your email"
            autoComplete="off"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <div className="flex items-center justify-between w-full border-b-2">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className="w-full px-1 py-1 text-sm text-white bg-transparent outline-none md:py-2 placeholder:text-white caret-white md:text-base"
              placeholder="Enter your password"
              autoComplete="off"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaRegEyeSlash fill="#fff" className="w-6 h-6" />
              ) : (
                <FaRegEye fill="#fff" className="w-6 h-6" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-1 text-sm font-semibold bg-white rounded-md md:text-base md:py-2 hover:opacity-75"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <p className="text-sm text-white md:text-base">
            Already have an account?
            <Link
              to="/signin"
              className="ml-1 text-sm text-white underline md:text-base underline-offset-2"
            >
              SignIn
            </Link>
          </p>
          <hr className="border-t-2 border-white h-[2px] w-full" />
          <GoogleOAuth />
          {/* <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full p-2 font-semibold bg-white rounded-md gap-x-4 hover:opacity-75"
          >
            <img
              src={facebookIcon}
              alt="Facebook Icon"
              className="w-5 h-5 md:h-8 md:w-8"
            />
            <span className="md:w-[60%] w-[75%] md:text-base text-sm">
              Signup With Facebook
            </span>
          </a> */}
        </form>
      </div>
    </div>
  );
};

export default Signup;
