import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { signOutSuccess } from "../redux/features/userSlice";
import { setActiveTab } from "../redux/features/navBarSlice";
import { toast } from "react-toastify";

const useSessionValidation = (currentUser) => {
  const [isTokenValid, setIsTokenValid] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const validateSession = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/auth/validate-session", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const jsonResponse = await response.json();
          if (jsonResponse.isValid) {
            setIsTokenValid(true);
          } else {
            toast.error("Session Expired. Please SignIn again.");
            dispatch(signOutSuccess());
            dispatch(setActiveTab(null));
            setIsTokenValid(false);
          }
        } else {
          setIsTokenValid(false);
        }
      } catch (error) {
        console.log("Session Validation Failed\n", error);
        toast.error("Server error. Please try again.");
        dispatch(signOutSuccess());
        dispatch(setActiveTab(null));
        setIsTokenValid(false);
      } finally {
        setIsLoading(false);
      }
    };
    if (currentUser) validateSession();
    else setIsTokenValid(false);
  }, [currentUser, dispatch]);
  return { isLoading, isTokenValid };
};

export default useSessionValidation;
