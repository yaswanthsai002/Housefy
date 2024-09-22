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
    if (!currentUser) {
      setIsTokenValid(false);
      setIsLoading(false);
      return;
    }

    const handleInvalidSession = () => {
      setIsTokenValid(false);
      dispatch(signOutSuccess());
      dispatch(setActiveTab(null));
    };

    const validateSession = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/auth/validate-session", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const jsonResponse = await response.json();
          setIsTokenValid(jsonResponse.isValid);
          if (!jsonResponse.isValid) {
            handleInvalidSession();
          }
        } else {
          handleInvalidSession();
        }
      } catch (error) {
        console.error("Session Validation Failed:", error);
        toast.error("Server error. Please try again.");
        handleInvalidSession();
      } finally {
        setIsLoading(false);
      }
    };

    validateSession();
  }, [currentUser, dispatch]);

  return { isLoading, isTokenValid };
};

export default useSessionValidation;
