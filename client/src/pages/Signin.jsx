/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import facebookIcon from "/icons/facebook-icon.svg";
import googleIcon from "/icons/google-icon.svg";
import { useState } from "react";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSignIn = (e) => {
    e.preventDefault();
    console.log(username, password);
  };
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-center bg-no-repeat bg-cover bg-signin-1">
      <div className="flex flex-col items-center justify-between w-3/4 lg:w-1/4 md:w-1/2 border-2 border-opacity-25 rounded-md backdrop-blur-[16px] py-8 gap-y-8">
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            className="w-full px-1 py-1 text-sm text-white bg-transparent border-b-2 outline-none md:text-base md:py-2 placeholder:text-white caret-white"
            placeholder="Enter your password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center justify-between w-full gap-x-4">
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
          </div>
          <button
            type="submit"
            className="w-full py-1 text-sm font-semibold bg-white rounded-md md:text-base md:py-2 hover:opacity-75"
          >
            Sign In
          </button>
          <p className="text-sm text-white md:text-base">
            Don't have an account?
            <Link
              to="/signup"
              className="ml-1 text-sm text-white underline underline-offset-2 md:text-base"
            >
              Register
            </Link>
          </p>
          <hr className="border-t-2 border-white h-[2px] w-full" />
          <a
            href="https://www.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full p-2 font-semibold bg-white rounded-md gap-x-4 hover:opacity-75"
          >
            <img
              src={googleIcon}
              alt="Google Icon"
              className="w-5 h-5 md:h-8 md:w-8"
            />
            <span className="md:w-[60%] w-[75%] md:text-base text-sm">
              Signup With Google
            </span>
          </a>
          <a
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
          </a>
        </form>
      </div>
    </div>
  );
};

export default Signin;
