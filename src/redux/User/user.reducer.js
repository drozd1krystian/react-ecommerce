import userTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  signInSuccess: false,
  signUpSuccess: false,
  signError: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    case userTypes.SIGN_IN_SUCCESS:
      return { ...state, signInSuccess: action.payload };
    case userTypes.SIGN_ERROR:
      return { ...state, signError: action.payload };
    case userTypes.SIGN_UP_SUCCESS:
      return { ...state, SIGN_UP_SUCCESS: action.payload };
    case userTypes.RESET_AUTH_FORMS:
      return {
        ...state,
        signUpSuccess: false,
        signInSuccess: false,
        signError: false,
      };
    default:
      return state;
  }
};

export default userReducer;
