import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./../../firebase/firebase";

export const registerUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_ISLOADING", value: true });
    console.log(data);
    return createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        dispatch({ type: "CHANGE_ISALLREADYEMAIL", value: false });
        dispatch({ type: "CHANGE_ISLOADING", value: false });
        resolve(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        dispatch({ type: "CHANGE_ISLOADING", value: false });
        dispatch({ type: "CHANGE_ISALLREADYEMAIL", value: true });
        reject(errorCode);
      });
  });
};

export const loginUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_ISLOADING", value: true });
    return signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        const dataUser = {
          email: user.email,
          uid: user.uid,
          emailVerified: user.emailVerified,
          refrestToken: user.refreshToken,
        };
        localStorage.setItem("userData", JSON.stringify(dataUser));
        dispatch({ type: "CHANGE_ISLOADING", value: false });
        dispatch({ type: "CHANGE_ISLOGIN", value: true });
        dispatch({ type: "CHANGE_USER", value: dataUser });
        resolve(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        dispatch({ type: "CHANGE_ISLOADING", value: false });
        dispatch({ type: "CHANGE_ISLOGIN", value: false });
        reject(errorCode);
      });
  });
};

export const logoutUserAPI = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_ISLOADING", value: true });
    return signOut(auth)
      .then(() => {
        dispatch({ type: "CHANGE_ISLOGIN", value: false });
        dispatch({ type: "CHANGE_ISLOADING", value: false });
        dispatch({ type: "CHANGE_USER", value: {} });
        localStorage.removeItem("userData");
        resolve(true);
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: "CHANGE_ISLOADING", value: false });
        reject(false);
      });
  });
};

export const resetPassword = (email) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_ISLOADING", value: true });
    return sendPasswordResetEmail(auth, email)
      .then(() => {
        dispatch({ type: "CHANGE_ISLOADING", value: false });
        console.log("berhasil");
        resolve(true);
      })
      .catch((erorr) => {
        console.log(erorr);
        dispatch({ type: "CHANGE_ISLOADING", value: false });
        reject(false);
      });
  });
};

export const checkLogin = (user) => (dispatch) => {
  if (user === null) {
    dispatch({ type: "CHANGE_ISLOGIN", value: false });
  } else {
    dispatch({ type: "CHANGE_ISLOGIN", value: true });
    dispatch({ type: "CHANGE_USER", value: user });
  }
};
