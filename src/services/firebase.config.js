// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTDKwlNzO4upwUInMntP-0vUFJFGQLZUE",
  authDomain: "bookclub-a2218.firebaseapp.com",
  databaseURL: "https://bookclub-a2218-default-rtdb.firebaseio.com",
  projectId: "bookclub-a2218",
  storageBucket: "bookclub-a2218.appspot.com",
  messagingSenderId: "1077108586782",
  appId: "1:1077108586782:web:a0e0a9e84e81c729e5710f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);