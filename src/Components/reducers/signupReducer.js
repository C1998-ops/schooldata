export const signupReducer = (state, action) => {
  switch (action.type) {
    case "NEXT_STEP":
      return { ...state, step: state.step + 1 };
    case "PREV_STEP":
      return { ...state, step: state.step - 1 };
    case "UPDATE_FIELD":
      return {
        ...state,
        userData: { ...state.userData, [action.field]: action.value },
      };
    case "SUBMIT_FORM":
      return { ...state, userData: { ...state.userData, ...action.data } };
    case "ERROR_OBJECT":
      return { ...state, error: { ...state.error, ...action.error } };
    case "UPDATE_ERR":
      return { ...state, error: { ...state.error, [action.field]: "" } };
    case "VALIDATE_PASSWORDS":
      const { password, retypePassword } = state?.userData;
      return {
        ...state,
        pwdErr: password !== retypePassword ? "Password must be same" : null,
      };
    case "CLEAR_FIELDS":
      return { ...state, userData: action.initialState };
    default:
      return state;
  }
};
