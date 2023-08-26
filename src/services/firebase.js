
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBTDKwlNzO4upwUInMntP-0vUFJFGQLZUE",
  authDomain: "bookclub-a2218.firebaseapp.com",
  databaseURL: "https://bookclub-a2218-default-rtdb.firebaseio.com",
  projectId: "bookclub-a2218",
  storageBucket: "bookclub-a2218.appspot.com",
  messagingSenderId: "1077108586782",
  appId: "1:1077108586782:web:a0e0a9e84e81c729e5710f"
};

const app = initializeApp(firebaseConfig);
// getAnalytics(app);

export const db = getFirestore(app);
