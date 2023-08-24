// // Import the functions you need from the SDKs you need
// import {initializeApp} from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBTDKwlNzO4upwUInMntP-0vUFJFGQLZUE",
//   authDomain: "bookclub-a2218.firebaseapp.com",
//   databaseURL: "https://bookclub-a2218-default-rtdb.firebaseio.com",
//   projectId: "bookclub-a2218",
//   storageBucket: "bookclub-a2218.appspot.com",
//   messagingSenderId: "1077108586782",
//   appId: "1:1077108586782:web:a0e0a9e84e81c729e5710f"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const db = getFirestore(app);

// export default db;

import firebase from "firebase/compat/app"
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBTDKwlNzO4upwUInMntP-0vUFJFGQLZUE",
  authDomain: "bookclub-a2218.firebaseapp.com",
  databaseURL: "https://bookclub-a2218-default-rtdb.firebaseio.com",
  projectId: "bookclub-a2218",
  storageBucket: "bookclub-a2218.appspot.com",
  messagingSenderId: "1077108586782",
  appId: "1:1077108586782:web:a0e0a9e84e81c729e5710f"
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore };