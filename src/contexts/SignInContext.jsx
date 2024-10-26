import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { host } from "../Components/utils/routes";
import { useToast } from "../hooks/useToast";

export const AuthContext = createContext(null);
export const SignInContextProvider = ({ children }) => {
  const [myState, setMyState] = useState(null);
  const toast = useToast();
  // const [auth, setAuth] = useState(() => {
  //   const userLogin = JSON.parse(localStorage.getItem("evol8User"));
  //   return userLogin ? userLogin : false;
  // });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("evol8User")) ?? null;
    setMyState(stored);
  }, []);

  const handleSignIn = async (info) => {
    try {
      const { data, status } = await axios.post(
        `${host}/account/signin`,
        info,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (data !== null && status === 200) {
        localStorage.setItem("evol8User", JSON.stringify(data?.userData));
        setMyState(data?.userData);
        toast.success("Signin successful !");
        return { success: true, data: data?.userData };
      }
    } catch (error) {
      console.error("Sign-in failed", error);
      toast.error(error.response?.data?.message || "An error has occured");
      return {
        success: false,
        message: error.response?.data?.message || "An error occurred",
      };
    }
  };
  // Sign out function
  const handleSignOut = () => {
    localStorage.removeItem("evol8User");
    toast.success("User logged out successfull");
    setMyState(null); // Clear user data from state
    // Optionally: Invalidate token with API call if necessary
  };

  // Function to check if user is authenticated
  const isAuthenticated = () => {
    return !!myState && !!localStorage.getItem("evol8User");
  };

  // Function to refresh token (if applicable)
  const refreshToken = async () => {
    try {
      const { data, status } = await axios.post(
        `${host}/account/refresh-token`,
        {
          wtoken: myState?.token,
        }
      );
      if (data && status === 200) {
        localStorage.setItem("evolUser", JSON.stringify(data?.userData));
        setMyState(data?.userData);
        return true;
      }
    } catch (error) {
      console.error("Token refresh failed", error);
      handleSignOut(); // Optionally log out the user on token refresh failure
      return false;
    }
  };

  // Get current user info
  const getCurrentUser = () => {
    return myState || JSON.parse(localStorage.getItem("evol8User"));
  };
  return (
    <AuthContext.Provider
      value={{
        myState,
        setMyState,
        handleSignIn,
        isAuthenticated,
        handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
