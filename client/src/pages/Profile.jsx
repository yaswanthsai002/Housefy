import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState, useRef } from "react";
import { PhoneInput } from "react-international-phone";
import CountrySelect from "@components/CountrySelect";
import ImageDragDropBrowseModal from "@components/ImageDragDropBrowseModal";
import "react-international-phone/style.css";
import defaultProfilePicture from "/icons/default-profile-picture.svg";
import { updateUser } from "../redux/features/userSlice.js";
import { toast } from "react-toastify";
import {
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon,
  ArrowUpTrayIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const fileRef = useRef(null);

  const [location, setLocation] = useState({
    country: currentUser.country || null,
    state: currentUser.state || null,
    city: currentUser.city || null,
  });

  const [changeDetails, setChangeDetails] = useState(false);

  const genderList = [
    { id: "male", displayText: "Male" },
    { id: "female", displayText: "Female" },
    { id: "others", displayText: "Others" },
  ];

  const [initialFormData, setInitialFormData] = useState({
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    profilePhotoURL: currentUser?.profilePhotoURL || defaultProfilePicture,
    mobile: currentUser.mobile || "",
    gender: currentUser.gender || "",
    dateOfBirth: currentUser.dateOfBirth
      ? currentUser.dateOfBirth.slice(0, currentUser.dateOfBirth.indexOf("T"))
      : null,
    country: location.country,
    state: location.state,
    city: location.city,
  });

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      mobile: value,
    }));
  };

  const handleSetLocation = useCallback((country, state, city) => {
    setLocation({ country, state, city });
    setFormData((prevData) => ({
      ...prevData,
      country,
      state,
      city,
    }));
  }, []);

  const handleProfilePhotoChange = (imageURL) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        profilePhotoURL: imageURL !== "" ? imageURL : defaultProfilePicture,
      };
    });
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setChangeDetails(false);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const jsonResponse = await response.json();
      if (!response.ok) {
        toast.error(jsonResponse.message);
        return;
      }
      dispatch(updateUser(jsonResponse.user));
      setInitialFormData(formData);
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log("Error occured while updating", error);
      toast.error("Error occcured while updating");
    } finally {
      setChangeDetails(false);
    }
  };

  return (
    <>
      <div className="flex justify-center w-full py-4">
        <div className="shadow-lg ring-1 ring-black p-4 rounded-lg ring-opacity-25 xl:w-[55%] w-[80%] gap-y-4 flex flex-col">
          <div className="flex justify-between items-center md:px-4 px-2 py-2 gap-x-4">
            <h1 className="text-2xl md:text-4xl font-bold font-urbanist text-slate-800">
              {changeDetails ? "Edit Profile" : "Profile"}
            </h1>
            {!changeDetails && (
              <button
                type="button"
                className="flex text-gray-800 hover:underline underline-offset-2 md:text-base text-sm"
                onClick={() => setChangeDetails(true)}
              >
                <PencilSquareIcon className="size-5" />
                Edit Details
              </button>
            )}
            {changeDetails && (
              <div className="flex justify-between items-center gap-x-4">
                <button
                  type="button"
                  className="flex justify-between items-center text-gray-800 hover:underline underline-offset-2 md:text-base text-sm"
                  onClick={handleSave}
                >
                  <CheckIcon className="size-5" />
                  Save
                </button>
                <button
                  type="button"
                  className="flex justify-between items-center text-gray-800 hover:underline underline-offset-2 md:text-base text-sm"
                  onClick={handleCancel}
                >
                  <XMarkIcon className="size-5" />
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div className="flex md:flex-row flex-col justify-between items-start">
            <div className="p-4 md:w-[35%] w-full flex flex-col gap-y-4 justify-center items-center">
              <img
                src={formData.profilePhotoURL}
                alt="profile photo"
                className="w-[200px] h-[200px] rounded-full"
                loading="lazy"
              />
              {isUploading && (
                <p className="text-green-500">
                  Image Uploading - {uploadProgress}%{" "}
                </p>
              )}
              {changeDetails && (
                <div className="flex justify-between items-center gap-x-4">
                  <button
                    type="button"
                    className={`flex items-center text-gray-800 hover:underline gap-x-1 underline-offset-2 md:text-base text-sm ${
                      isUploading ? "cursor-not-allowed" : ""
                    }`}
                    onClick={() => setShowModal(true)}
                    disabled={isUploading}
                  >
                    <ArrowUpTrayIcon className="size-4" />
                    Upload
                  </button>
                  <button
                    type="button"
                    className={`flex items-center text-gray-800 hover:underline gap-x-1 underline-offset-2 md:text-base text-sm ${
                      isUploading ? "cursor-not-allowed" : ""
                    }`}
                    onClick={() => handleProfilePhotoChange("")}
                    disabled={isUploading}
                  >
                    <TrashIcon className="size-4" />
                    Delete
                  </button>
                </div>
              )}
            </div>

            <form className="md:w-[60%] w-full flex flex-col items-start gap-y-4 px-4 py-2">
              <div className="flex lg:flex-row flex-col justify-between items-center xl:gap-x-8 lg:gap-x-4 gap-y-4 lg:gap-y-0 w-full">
                <div className="flex flex-col justify-between items-start gap-y-1 lg:w-auto w-full">
                  <label htmlFor="firstName" className="font-semibold text-sm">
                    FirstName
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    id="firstName"
                    onChange={handleInputChange}
                    name="firstName"
                    className="bg-gray-100 px-2 py-1 border-2 border-gray-400 rounded-md outline-none w-full"
                    disabled={!changeDetails}
                  />
                </div>
                <div className="flex flex-col justify-between items-start gap-y-1 lg:w-auto w-full">
                  <label htmlFor="lastName" className="font-semibold text-sm">
                    LastName
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    id="lastName"
                    onChange={handleInputChange}
                    name="lastName"
                    className="bg-gray-100 px-2 py-1 border-2 border-gray-400 rounded-md outline-none w-full"
                    disabled={!changeDetails}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-between items-start gap-y-1 w-full">
                <label htmlFor="dateOfBirth" className="font-semibold text-sm">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  id="dateOfBirth"
                  onChange={handleInputChange}
                  name="dateOfBirth"
                  placeholder=""
                  className="bg-gray-100 px-2 py-1 border-2 border-gray-400 rounded-md outline-none w-full"
                  disabled={!changeDetails}
                />
              </div>
              <div className="flex flex-col justify-between items-start gap-y-1 w-full">
                <label htmlFor="mobile" className="font-semibold text-sm">
                  Mobile
                </label>
                <PhoneInput
                  defaultCountry="in"
                  value={formData.mobile}
                  id="mobile"
                  name="mobile"
                  forceDialCode={true}
                  onChange={handlePhoneChange}
                  disabled={!changeDetails}
                />
              </div>
              <div className="flex flex-col justify-between items-start gap-y-1 w-full">
                <label htmlFor="gender" className="font-semibold text-sm">
                  Gender
                </label>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-x-4">
                  {genderList.map((gender) => (
                    <div
                      className="flex justify-between items-center gap-x-2"
                      key={gender.id}
                    >
                      <input
                        id={gender.id}
                        type="radio"
                        name="gender"
                        value={gender.id}
                        onChange={handleInputChange}
                        className={`w-4 h-4 ${
                          changeDetails ? "cursor-pointer" : "cursor-default"
                        }`}
                        disabled={!changeDetails}
                        checked={gender.id === formData.gender}
                      />
                      <label
                        htmlFor={gender.id}
                        className={`flex items-center ${
                          changeDetails ? "cursor-pointer" : "cursor-default"
                        }`}
                      >
                        {gender.displayText}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <CountrySelect
                handleSetLocation={handleSetLocation}
                changeDetails={changeDetails}
                country={currentUser.country}
                state={currentUser.state}
                city={currentUser.city}
              />
            </form>
          </div>
        </div>
      </div>
      <ImageDragDropBrowseModal
        showModal={showModal}
        setShowModal={setShowModal}
        fileRef={fileRef}
        handleProfilePhotoChange={handleProfilePhotoChange}
        setIsUploading={setIsUploading}
        setUploadProgress={setUploadProgress}
      />
    </>
  );
};

export default Profile;
