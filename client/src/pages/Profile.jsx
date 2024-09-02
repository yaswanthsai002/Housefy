import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { useCallback, useEffect, useState, useRef } from "react";
import { PhoneInput } from "react-international-phone";
import CountrySelect from "@components/CountrySelect";
import "react-international-phone/style.css";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [changePhoto, setChangePhoto] = useState(false);
  const [location, setLocation] = useState({
    country: null,
    state: null,
    city: null,
  });
  const [changeDetails, setChangeDetails] = useState(false);
  const { firstName, lastName, email, profilePhotoURL } = currentUser;
  const genderList = [
    { id: "male", displayText: "Male" },
    { id: "female", displayText: "Female" },
    { id: "others", displayText: "Others" },
  ];

  const [formData, setFormData] = useState({
    firstName,
    lastName,
    email,
    profilePhotoURL,
    mobile: "",
    gender: "",
    dateOfBirth: "",
    country: location.country,
    state: location.state,
    city: location.city,
  });

  // Ref to keep track of previous formData
  const prevFormDataRef = useRef(formData);

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
  }, []);

  useEffect(() => {
    // Check if formData has changed compared to the previous state
    if (JSON.stringify(prevFormDataRef.current) !== JSON.stringify(formData)) {
      console.log("Form Data Changed:", formData);
      // Update the ref with the current formData
      prevFormDataRef.current = formData;
    }
  }, [formData]);

  return (
    <div className="flex justify-center w-full py-4">
      <div className="shadow-lg ring-1 ring-black p-4 rounded-lg ring-opacity-25 xl:w-[55%] w-[80%] gap-y-4 flex flex-col">
        <div className="flex md:flex-row flex-col justify-between items-center">
          <div className="p-4 md:w-[35%] w-full flex flex-col gap-y-4 justify-center items-center">
            <h1 className="text-4xl font-bold font-urbanist text-slate-800">
              Edit Profile
            </h1>
            <img
              src={profilePhotoURL}
              alt="profile photo"
              className="w-[200px] h-[200px] rounded-full"
            />
            {!changePhoto && (
              <button
                type="button"
                className="flex justify-between items-center gap-x-2 text-white py-1 px-2 rounded-md bg-slate-800 hover:bg-white border-2 border-transparent hover:text-slate-800 hover:border-slate-800 transition-colors ease-out duration-200"
                onClick={() => setChangePhoto(true)}
              >
                <MdEdit /> Edit
              </button>
            )}
            {changePhoto && (
              <div className="flex justify-between items-center gap-x-4">
                <button
                  type="button"
                  className="flex justify-between items-center gap-x-2 text-white py-1 px-2 rounded-md bg-slate-800 hover:bg-white border-2 border-transparent hover:text-slate-800 hover:border-slate-800 transition-colors ease-out duration-200"
                  onClick={() => setChangePhoto(false)}
                >
                  <FaSave /> Save
                </button>
                <button
                  type="button"
                  className="flex justify-between items-center gap-x-2 text-white py-1 px-2 rounded-md bg-slate-800 hover:bg-white border-2 border-transparent hover:text-slate-800 hover:border-slate-800 transition-colors ease-out duration-200"
                  onClick={() => setChangePhoto(false)}
                >
                  <FaX /> Cancel
                </button>
              </div>
            )}
          </div>
          <form className="md:w-[60%] w-full flex flex-col items-start gap-y-4 px-4 py-2">
            <div className="flex lg:flex-row flex-col justify-between items-center xl:gap-x-8 lg:gap-x-4 gap-y-4 lg:gap-y-0 w-full">
              <div className="flex flex-col justify-between items-start gap-y-1 lg:w-auto w-full">
                <label htmlFor="firstName" className="font-semibold">
                  FirstName
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  id="firstName"
                  onChange={handleInputChange}
                  name="firstName"
                  className="bg-gray-100 p-2 border-2 border-gray-400 rounded-md outline-none w-full"
                />
              </div>
              <div className="flex flex-col justify-between items-start gap-y-1 lg:w-auto w-full">
                <label htmlFor="lastName" className="font-semibold">
                  LastName
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  id="lastName"
                  onChange={handleInputChange}
                  name="lastName"
                  className="bg-gray-100 p-2 border-2 border-gray-400 rounded-md outline-none w-full"
                />
              </div>
            </div>
            {/* <div className="flex flex-col justify-between items-start gap-y-1 w-full">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                type="text"
                value={formData.email}
                id="email"
                onChange={handleInputChange}
                name="email"
                className="bg-gray-100 p-2 border-2 border-gray-400 rounded-md outline-none w-full"
              />
            </div> */}
            <div className="flex flex-col justify-between items-start gap-y-1 w-full">
              <label htmlFor="dateOfBirth" className="font-semibold">
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                id="dateOfBirth"
                onChange={handleInputChange}
                name="dateOfBirth"
                placeholder=""
                className="bg-gray-100 p-2 border-2 border-gray-400 rounded-md outline-none w-full cursor-pointer"
              />
            </div>
            <div className="flex flex-col justify-between items-start gap-y-1 w-full">
              <label htmlFor="mobile" className="font-semibold">
                Mobile
              </label>
              <PhoneInput
                defaultCountry="in"
                value={formData.mobile}
                id="mobile"
                name="mobile"
                forceDialCode={true}
                onChange={handlePhoneChange}
              />
            </div>
            <div className="flex flex-col justify-between items-start gap-y-1 w-full">
              <label htmlFor="gender" className="font-semibold">
                Gender
              </label>
              <div className="flex justify-between items-center gap-x-4">
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
                      className="cursor-pointer w-4 h-4"
                    />
                    <label
                      htmlFor={gender.id}
                      className="flex items-center cursor-pointer"
                    >
                      {gender.displayText}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <CountrySelect handleSetLocation={handleSetLocation} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
