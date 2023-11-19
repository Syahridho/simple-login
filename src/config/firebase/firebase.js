// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDk5_pny3ksJC6BY9ooUhtOzYfdbHdUMG4",
  authDomain: "simple-login-react-cf130.firebaseapp.com",
  databaseURL:
    "https://simple-login-react-cf130-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "simple-login-react-cf130",
  storageBucket: "simple-login-react-cf130.appspot.com",
  messagingSenderId: "203369559187",
  appId: "1:203369559187:web:0fe08617128e1bf80fc966",
  measurementId: "G-9N4VRNP1M7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();

export { app, auth, analytics };
