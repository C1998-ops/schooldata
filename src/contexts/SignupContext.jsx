import React, { createContext, useReducer } from "react";
import { signupReducer } from "../Components/reducers/signupReducer";
import axios from "axios";
import { host } from "../Components/utils/routes";
export const SignupContext = createContext(null);

export const SignupContextProvider = ({ children }) => {
  const initialState = {
    step: 1, // to keep track of the current step
    userData: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      companyName: "",
      dob: "",
      password: "",
      retypePassword: "",

      // firstName: "post",
      // lastName: "man",
      // email: "postman@gmail.com",
      // mobile: 9380215110,
      // companyName: "test",
      // password: "test123890",
      // retypePassword: "",
    },
    error: {},
    pwdErr: null,
  };
  const [state, dispatch] = useReducer(signupReducer, initialState);

  const next = () => dispatch({ type: "NEXT_STEP" });
  const previous = () => dispatch({ type: "PREV_STEP" });
  const change = (event) => {
    const { name, value } = event?.target;
    dispatch({
      type: "UPDATE_FIELD",
      field: name,
      value: value,
    });
    dispatch({ type: "UPDATE_ERR", field: name });
  };
  function handlePassword(event) {
    const { name } = event.target;
    // Trigger password validation if password or retypePassword changes
    if (name === "password" || name === "retypePassword") {
      dispatch({ type: "VALIDATE_PASSWORDS" });
    }
  }
  const submit = () => {
    dispatch({ type: "SUBMIT_FORM", data: state?.userData });
  };
  const handleSignUp = async () => {
    try {
      const { data, status } = await axios.post(
        `${host}/account/signup`,
        state?.userData,
        { headers: { "Content-Type": "application/json" } }
      );
      if (status === 201 && data !== null) {
        return { success: true, data };
      }
    } catch (error) {
      console.error("error creating user account", error);
      throw new Error(error.response.data.message);
    } finally {
      dispatch({ type: "CLEAR_FIELDS", initialState: initialState.userData });
    }
  };
  const error = (error) => {
    dispatch({ type: "ERROR_OBJECT", error });
  };
  const actions = {
    next,
    previous,
    state,
    dispatch,
    change,
    submit,
    error,
    handlePassword,
    handleSignUp,
  };
  return (
    <SignupContext.Provider value={actions}>{children}</SignupContext.Provider>
  );
};
