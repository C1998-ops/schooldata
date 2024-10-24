// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYmSak9U9-y5BpgVWpRbAlfIjVPDRhrmc",
  authDomain: "evol8schooldata.firebaseapp.com",
  projectId: "evol8schooldata",
  storageBucket: "evol8schooldata.appspot.com",
  messagingSenderId: "813266879953",
  appId: "1:813266879953:web:4ab4c6b68dc3e1f4d88cf0",
  measurementId: "G-W8T5REQZGH",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
