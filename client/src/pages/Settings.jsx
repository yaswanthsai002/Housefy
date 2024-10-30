import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  NoSymbolIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import EditEmailModal from "@components/EditEmailModal";
import EditPasswordModal from "@components/EditPasswordModal";
import ConfirmModal from "@components/ConfirmModal";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [confirmDisable, setConfirmDisable] = useState(null);
  const navigate = useNavigate(null);
  useEffect(() => {
    if (!currentUser) {
      navigate("/signup");
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }
  return (
    <>
      <div className="flex justify-center w-full py-4">
        <div className="shadow-lg ring-1 ring-black p-4 rounded-lg ring-opacity-25 xl:w-[45%] w-[80%] flex flex-col gap-y-4">
          <h1 className="text-2xl md:text-4xl font-bold font-urbanist text-slate-800 m-2">
            Settings
          </h1>
          <div className="flex flex-col w-full justify-between items-center md:px-4 px-2 py-2 gap-y-4">
            <div className="md:w-3/4 w-full flex flex-col md:flex-row gap-x-4 gap-y-2 justify-between md:items-center items-start">
              <p className="font-semibold text-sm md:text-base w-1/5">Email</p>
              <div className="flex justify-between items-center gap-x-2 lg:w-4/5 w-full">
                <input
                  type="text"
                  name="userEmail"
                  id="currentUserEmail"
                  value={currentUser.email}
                  disabled={true}
                  className={`bg-gray-100 px-2 py-1 border-2 border-gray-400 rounded-md outline-none flex-grow text-sm ${
                    !editEmail && "cursor-not-allowed"
                  }`}
                />
                <button type="button" onClick={() => setEditEmail(true)}>
                  <PencilSquareIcon className="size-5 cursor-pointer" />
                </button>
              </div>
            </div>
            <div className="md:w-3/4 w-full flex flex-col md:flex-row gap-x-4 gap-y-2 justify-between md:items-center items-start">
              <p className="font-semibold text-sm md:text-base w-1/5">
                Password
              </p>
              <div className="flex justify-between items-center gap-x-2 lg:w-4/5 w-full">
                <input
                  type="text"
                  name="userPassword"
                  id="currentUserPassword"
                  value={"*".repeat(16)}
                  disabled={true}
                  className={`bg-gray-100 px-2 py-1 border-2 border-gray-400 rounded-md outline-none flex-grow text-sm ${
                    !editPassword && "cursor-not-allowed"
                  }`}
                />
                <button type="button" onClick={() => setEditPassword(true)}>
                  <PencilSquareIcon className="size-5 cursor-pointer" />
                </button>
              </div>
            </div>
            <div className="md:w-3/4 w-full flex flex-col md:flex-row gap-x-4 gap-y-2 justify-evenly md:items-center items-start mt-4">
              <button
                type="button"
                className="rounded-lg flex justify-between items-center gap-x-1 px-4 py-2 font-semibold bg-orange-400 text-orange-950 text-sm self-center w-[175px]"
                onClick={() => setConfirmDisable(true)}
              >
                Disable Account
                <NoSymbolIcon className="size-5" />
              </button>
              <button
                type="button"
                className="rounded-lg flex justify-between items-center gap-x-1 px-4 py-2 font-semibold bg-red-500 text-red-950 text-sm self-center w-[175px]"
                onClick={() => setConfirmDelete(true)}
              >
                Delete Account
                <TrashIcon className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {editEmail && <EditEmailModal setEditEmail={setEditEmail} />}
      {editPassword && <EditPasswordModal setEditPassword={setEditPassword} />}
      {confirmDelete && (
        <ConfirmModal callback={setConfirmDelete} type="delete" />
      )}
      {confirmDisable && (
        <ConfirmModal callback={setConfirmDisable} type="disable" />
      )}
    </>
  );
};

export default Settings;
