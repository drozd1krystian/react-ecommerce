import userTypes from "./user.types";
import { auth, handleUserProfile } from "../../firebase/utils";

export const emailSignInStart = (userCredentials) => ({
  type: userTypes.EMAIL_SIGN_IN_START,
  payload: userCredentials,
});

export const signInSuccess = (user) => ({
  type: userTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const checkUserSession = () => ({
  type: userTypes.CHECK_USER_SESSION,
});

export const signOutUserStart = () => ({
  type: userTypes.SIGN_OUT_USER_START,
});

export const signOutUserSuccess = () => ({
  type: userTypes.SIGN_OUT_USER_SUCCESS,
});

export const setCurrentUser = (user) => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user,
});

export const resetAllAuthForms = () => ({
  type: userTypes.RESET_AUTH_FORMS,
});

// export const signInUser = ({ email, password }) => async (dispatch) => {
//   try {
//     await auth.signInWithEmailAndPassword(email, password);
//     dispatch({
//       type: userTypes.SIGN_IN_SUCCESS,
//       payload: true,
//     });
//   } catch (err) {
//     dispatch({
//       type: userTypes.SIGN_ERROR,
//       payload: [err.message],
//     });
//   }
// };

export const signUpUser = ({
  email,
  password,
  confirmPassword,
  displayName,
}) => async (dispatch) => {
  if (password !== confirmPassword || password === "") {
    const err = "Passwords Don't Match";
    dispatch({
      type: userTypes.SIGN_ERROR,
      payload: [err],
    });
    return;
  }

  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    await handleUserProfile(user, { displayName });
    dispatch({
      type: userTypes.SIGN_UP_SUCCESS,
      payload: true,
    });
  } catch (err) {
    dispatch({
      type: userTypes.SIGN_ERROR,
      payload: [err.message],
    });
  }
};
