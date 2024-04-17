// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGNdz0rro4XO_3hmT3CUbxJ5p7ENy0jZc",
  authDomain: "my-react-blog-318a2.firebaseapp.com",
  projectId: "my-react-blog-318a2",
  storageBucket: "my-react-blog-318a2.appspot.com",
  messagingSenderId: "340159959816",
  appId: "1:340159959816:web:10b10c3d09e75e69fe92bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };