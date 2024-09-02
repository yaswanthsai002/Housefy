/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
// import facebookIcon from "/icons/facebook-icon.svg";
import { useState, useEffect } from "react";
import signinBg from "/images/signin-bg.webp";
import signinBlurred from "/images/signin-blurred.webp";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess } from "../redux/features/userSlice.js";
import { setActiveTab } from "../redux/features/navBarSlice.js";
import { Navigate } from "react-router-dom";
import GoogleOAuth from "@components/GoogleOAuth.jsx";
const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [bgImageLoaded, setBgImageLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const img = new Image();
    img.src = signinBg;
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

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (formData.password.length < 8 || formData.password.length > 16) {
      toast.error("Password length must be in between 8 to 16 characters");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("api/auth/signin/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const jsonResponse = await response.json();
      if (!response.ok) {
        toast.error(jsonResponse.message);
        return;
      }
      dispatch(signInSuccess(jsonResponse.user));
      dispatch(setActiveTab("HOME"));
      navigate("/");
      toast.success(`Welcome to Housefy, ${jsonResponse.user.firstName}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setFormData({ firstName: "", lastName: "", email: "", password: "" });
      setLoading(false);
    }
  };

  return currentUser ? (
    <Navigate to="/" />
  ) : (
    <div
      className={`flex items-center justify-center md:min-h-[calc(100vh-80px)] min-h-[calc(100vh-64px)]  bg-center bg-no-repeat bg-cover transition-all duration-500 ease-in-out ${
        bgImageLoaded ? "bg-signup" : "bg-placeholder"
      }`}
      style={{
        backgroundImage: `url(${bgImageLoaded ? signinBg : signinBlurred})`,
      }}
    >
      <div className="flex flex-col items-center justify-between w-3/4 lg:w-1/4 md:w-1/2 border-2 border-opacity-25 rounded-md backdrop-blur-[25px] py-8 gap-y-8">
        <h1 className="text-2xl font-extrabold text-white md:text-4xl font-urbanist">
          Sign In
        </h1>
        <form
          className="flex flex-col items-center justify-between w-[85%] gap-y-4"
          onSubmit={handleSignIn}
        >
          <input
            type="email"
            name="email"
            id="email"
            className="w-full px-1 py-1 text-sm text-white bg-transparent border-b-2 outline-none md:text-base md:py-2 placeholder:text-white caret-white"
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
                <FaRegEyeSlash fill="#fff" className="w-5 h-5" />
              ) : (
                <FaRegEye fill="#fff" className="w-5 h-5" />
              )}
            </button>
          </div>
          {/* <div className="flex items-center justify-between w-full gap-x-4">
            <div className="flex items-center justify-between gap-x-1">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                className="text-white cursor-pointer "
              />
              <label
                htmlFor="rememberMe"
                className="text-sm text-white md:text-base"
              >
                Remember me
              </label>
            </div>
            <a
              href="http://"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white md:text-base"
            >
              Forgot password?
            </a>
          </div> */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-1 text-sm font-semibold bg-white rounded-md md:text-base md:py-2 hover:opacity-75"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
          <p className="self-start text-sm text-white">
            Don't have an account?
            <Link
              to="/signup"
              className="ml-1 text-sm text-white underline underline-offset-2"
            >
              Register
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
              Signin With Facebook
            </span>
          </a> */}
        </form>
      </div>
    </div>
  );
};

export default Signin;
