import { createContext, useReducer } from "react";
import { toastReducer } from "../Components/reducers/toastReducer";
import ToastContainer from "../Components/Toast/ToastContainer";

export const ToastContext = createContext();
export const ToastContextProvider = ({ children }) => {
  const initialState = {
    toasts: [],
  };
  const [state, dispatch] = useReducer(toastReducer, initialState);
  const addToast = (type, message) => {
    const id = Math.random(Math.floor() * 10000000);
    dispatch({
      type: "ADD_TOAST",
      payload: { id, type, message },
    });
  };
  const success = (message) => {
    addToast("success", message);
  };
  const error = (message) => {
    addToast("error", message);
  };
  const remove = (id) => {
    dispatch({ type: "REMOVE_TOAST", payload: id });
  };
  const value = { success, remove, error };

  return (
    <ToastContext.Provider value={value}>
      <ToastContainer toasts={state.toasts} />
      {children}
    </ToastContext.Provider>
  );
};
