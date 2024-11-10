/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import { signOutSuccess } from "../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { handleModalClick } from "../../constants";

const EmailandPasswordModal = ({ callback, type }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAccount = async (e) => {
    e.preventDefault();
    if (currentUser.email !== userEmail) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      const response = await fetch(`/api/user/${type}/${currentUser._id}`, {
        method: type === "disable" ? "PUT" : "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail, password: userPassword }),
      });
      const jsonResponse = await response.json();
      if (!response.ok) {
        toast.error(jsonResponse.message);
        return;
      }
      toast.success(jsonResponse.message);
      dispatch(signOutSuccess());
      type === "delete" ? navigate("/signup") : navigate("/signin");
    } catch (err) {
      const errString = `Error occured while ${
        type === "delete" ? "deleting" : "disabling"
      } user`;
      console.log(errString, err);
      toast.error(errString);
    } finally {
      setUserEmail("");
      setUserPassword("");
    }
  };
  return (
    <div
      className="fixed inset-0 min-h-screen bg-black bg-opacity-30 z-20 backdrop-blur-sm flex justify-center items-center"
      onClick={(e) => handleModalClick(e, containerRef, callback, false)}
    >
      <div
        className="px-4 py-8 rounded-lg xl:w-[30%] lg:w-[50%] md:w-[70%] w-[90%] flex flex-col gap-y-4 bg-white"
        ref={containerRef}
      >
        <h1 className="self-center font-bold md:text-4xl text-2xl font-urbanist">
          {`${type.charAt(0).toUpperCase() + type.slice(1)}`} Account
        </h1>
        <p className="font-medium text-[12px] mx-4">
          To proceed with {type === "delete" ? "deleting" : "disabling"} of your
          account, please provide your email address and password.
        </p>
        <form
          className="flex flex-col justify-between items-start md:gap-y-4 gap-y-2 w-full px-4"
          onSubmit={(e) => handleAccount(e)}
        >
          <div className="flex flex-col justify-between items-start gap-y-1 w-full">
            <label
              htmlFor="userEmail"
              className="font-semibold md:text-base text-sm"
            >
              Email
            </label>
            <input
              type="email"
              name="userEmail"
              id="userEmail"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-gray-100 px-2 py-1 border-2 border-gray-400 rounded-md outline-none flex-grow text-sm w-full"
            />
          </div>
          <div className="flex flex-col justify-between items-start gap-y-1 w-full">
            <label
              htmlFor="userPassword"
              className="font-semibold md:text-base text-sm"
            >
              Password
            </label>
            <input
              type="password"
              name="userPassword"
              id="userPassword"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              placeholder="Enter your password"
              className="bg-gray-100 px-2 py-1 border-2 border-gray-400 rounded-md outline-none flex-grow text-sm w-full"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-gray-700 text-white cursor-pointer font-semibold py-2 md:text-base text-sm"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailandPasswordModal;
