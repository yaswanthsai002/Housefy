/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import facebookIcon from "/icons/facebook-icon.svg";
import googleIcon from "/icons/google-icon.svg";

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-center bg-no-repeat bg-cover bg-signin-0">
      <div className="flex flex-col items-center justify-between w-3/4 lg:w-1/4 md:w-1/2 border-2 border-opacity-25 rounded-md backdrop-blur-[16px] md:py-8 py-4 md:gap-y-8 gap-y-4">
        <h1 className="text-2xl font-extrabold text-white md:text-4xl font-urbanist">
          Sign Up
        </h1>
        <form className="flex flex-col items-center justify-between w-[85%] gap-y-4">
          <div className="flex flex-col items-center justify-between w-full md:flex-row names-grp gap-x-4 gap-y-4">
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="w-full px-1 py-1 text-sm text-white bg-transparent border-b-2 outline-none md:py-2 md:w-1/2 placeholder:text-white caret-white md:text-base"
              placeholder="First Name"
              autoComplete="off"
            />
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="w-full px-1 py-1 text-sm text-white bg-transparent border-b-2 outline-none md:py-2 md:w-1/2 placeholder:text-white caret-white md:text-base"
              placeholder="Last Name"
              autoComplete="off"
            />
          </div>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full px-1 py-1 text-sm text-white bg-transparent border-b-2 outline-none md:py-2 placeholder:text-white caret-white md:text-base"
            placeholder="Enter your email"
            autoComplete="off"
          />
          <input
            type="password"
            name="password"
            id="password"
            className="w-full px-1 py-1 text-sm text-white bg-transparent border-b-2 outline-none md:py-2 placeholder:text-white caret-white md:text-base"
            placeholder="Enter your password"
            autoComplete="off"
          />
          <input
            type="password"
            name="confirm-password"
            id="confirmPassword"
            className="w-full px-1 py-1 text-sm text-white bg-transparent border-b-2 outline-none md:py-2 placeholder:text-white caret-white md:text-base"
            placeholder="Confirm your password"
            autoComplete="off"
          />
          <div className="flex items-center justify-between w-full my-1">
            <div className="flex items-center justify-between gap-x-2 md:gap-x-1">
              <input
                type="checkbox"
                id="termsAndConditions"
                name="termsAndConditions"
                className="text-white cursor-pointer"
              />
              <label
                htmlFor="termsAndConditions"
                className="text-sm text-white md:text-base"
              >
                I accept the{" "}
                <span className="underline cursor-pointer underline-offset-2">
                  Terms & Conditions
                </span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-1 text-sm font-semibold bg-white rounded-md md:text-base md:py-2 hover:opacity-75"
          >
            Sign Up
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

export default Signup;
