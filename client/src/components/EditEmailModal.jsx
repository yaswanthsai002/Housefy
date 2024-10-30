/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { updateUser } from "../redux/features/userSlice.js";
import { handleModalClick } from "../../constants.js";

const EditEmailModal = ({ setEditEmail }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [newEmail, setNewEmail] = useState("");
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const handleSave = async () => {
    if (!newEmail) {
      toast.error("New Email should not be empty");
      setNewEmail("");
      return;
    }
    if (currentUser.email === newEmail) {
      toast.error("New Email and Current Email should not be same");
      setNewEmail("");
      return;
    }
    try {
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail }),
      });
      const jsonResponse = await response.json();
      if (!response.ok) {
        toast.error(jsonResponse.message);
        return;
      }
      dispatch(updateUser(jsonResponse.user));
      toast.success("Email Updated Successfully");
    } catch (error) {
      console.log("Error occured while updating", error);
      toast.error("Error occcured while updating");
    } finally {
      setNewEmail("");
    }
  };

  const handleCancel = () => {
    setEditEmail(false);
  };

  return (
    <div
      className="fixed inset-0 min-h-screen bg-black bg-opacity-30 z-20 backdrop-blur-sm flex justify-center items-center"
      onClick={(e) => handleModalClick(e, containerRef, setEditEmail, false)}
    >
      <div
        className="p-4 rounded-lg xl:w-[30%] lg:w-[50%] md:w-[70%] w-[90%] flex flex-col gap-y-4 bg-white"
        ref={containerRef}
      >
        <h1 className="text-2xl md:text-4xl font-bold font-urbanist text-slate-800 m-2">
          Edit Email
        </h1>
        <div className="flex flex-col w-full justify-between items-center md:px-4 px-2 py-2 gap-y-4">
          <div className="w-full flex flex-col md:flex-row gap-x-4 gap-y-2 justify-between md:items-center items-start">
            <p className="font-semibold text-sm md:text-base md:w-1/5 w-full">
              Current Email
            </p>
            <div className="flex justify-between items-center gap-x-2 lg:w-4/5 w-full">
              <input
                type="text"
                name="currentEmail"
                id="currentEmail"
                value={currentUser.email}
                disabled={true}
                className="bg-gray-100 px-2 py-1 border-2 border-gray-400 rounded-md outline-none flex-grow text- cursor-not-allowed"
              />
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row gap-x-4 gap-y-2 justify-between md:items-center items-start">
            <p className="font-semibold text-sm md:text-base md:w-1/5 w-full">
              New Email
            </p>
            <div className="flex justify-between items-center gap-x-2 lg:w-4/5 w-full">
              <input
                type="email"
                name="newEmail"
                id="newEmail"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="bg-gray-100 px-2 py-1 border-2 border-gray-400 rounded-md outline-none flex-grow text-sm"
              />
            </div>
          </div>
          <div className="md:w-3/4 w-full flex flex-row gap-x-4 gap-y-2 justify-evenly md:items-center items-start mt-4">
            <button
              type="button"
              className="rounded-lg flex justify-between items-center gap-x-1 px-4 py-2 font-semibold bg-green-400 text-green-900 text-sm"
              onClick={handleSave}
            >
              Save
              <CheckIcon className="size-5" />
            </button>
            <button
              type="button"
              className="rounded-lg flex justify-between items-center gap-x-1 px-4 py-2 font-semibold bg-red-500 text-red-950 text-sm"
              onClick={handleCancel}
            >
              Cancel
              <XMarkIcon className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmailModal;
