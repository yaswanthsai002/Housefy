/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import EmailandPasswordModal from "@components/EmailandPasswordModal";
import { handleModalClick } from "../../constants";

const ConfirmModal = ({ callback, type }) => {
  const [showForm, setShowForm] = useState(null);
  const containerRef = useRef(null);
  return (
    <>
      <div
        className="fixed inset-0 min-h-screen bg-black bg-opacity-30 z-20 backdrop-blur-sm flex justify-center items-center"
        onClick={(e) => handleModalClick(e, containerRef, callback, false)}
      >
        <div
          className="p-4 rounded-lg xl:w-[30%] lg:w-[50%] md:w-[70%] w-[90%] flex flex-col gap-y-1 bg-white"
          ref={containerRef}
        >
          <div className="flex flex-col w-full justify-between items-center px-2 py-2 gap-y-4">
            <h1 className="text-xl font-mono font-bold self-start">
              Confirm {`${type.charAt(0).toUpperCase() + type.slice(1)}`}{" "}
              Account
            </h1>
            <p className="md:text-base text-sm font-medium text-gray-600">
              Are you sure want to {`${type}`} your account?
            </p>
            <div className="flex justify-between items-center gap-x-4">
              <button
                type="button"
                className="rounded-lg flex justify-between items-center gap-x-1 px-4 py-2 font-semibold bg-green-400 text-green-900 text-sm"
                onClick={() => {
                  setShowForm(true);
                }}
              >
                Yes
                <CheckIcon className="size-5" />
              </button>
              <button
                type="button"
                className="rounded-lg flex justify-between items-center gap-x-1 px-4 py-2 font-semibold bg-red-500 text-red-950 text-sm"
                onClick={() => callback(false)}
              >
                No
                <XMarkIcon className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {showForm && <EmailandPasswordModal callback={callback} type={type} />}
    </>
  );
};

export default ConfirmModal;
