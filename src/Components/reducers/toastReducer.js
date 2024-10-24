export const toastReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      const inputs = action.payload;
      return { ...state, toasts: [...state.toasts, inputs] };
    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload),
      };
    default:
      // throw new Error(`Unhandled Action type : ${action.type}`);
      return state;
  }
};
