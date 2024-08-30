import googleIcon from "/icons/google-icon.svg";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase.js";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/features/userSlice.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const GoogleOAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleSignin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const response = await fetch("api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        }),
      });
      if(!response.ok) {
        toast.error("Error occured while signing in with Google");
        return;
      }
      const jsonResponse = await response.json();
      dispatch(signInSuccess(jsonResponse.user));
      toast.success(`Welcome to Housefy, ${result.user.displayName}`);
      navigate("/")
    } catch (error) {
      toast.error("Error occured while signing in with Google");
      console.error("Error occured while signing in with Google", error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleSignin}
      className="flex items-center justify-center w-full p-2 font-semibold bg-white rounded-md gap-x-4 hover:opacity-75"
    >
      <img
        src={googleIcon}
        alt="Google Icon"
        className="w-5 h-5 md:h-8 md:w-8"
      />
      <span className="md:w-[60%] w-[75%] md:text-base text-sm">
        Signin With Google
      </span>
    </button>
  );
};

export default GoogleOAuth;
