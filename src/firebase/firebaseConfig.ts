import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCn1lgfbGBwMts0CR2fZ6URwXj-BZtPzGA",
  authDomain: "react-firebase-84c9b.firebaseapp.com",
  databaseURL: "https://react-firebase-84c9b-default-rtdb.firebaseio.com",
  projectId: "react-firebase-84c9b",
  storageBucket: "react-firebase-84c9b.appspot.com",
  messagingSenderId: "738296567260",
  appId: "1:738296567260:web:8598606c0fcad29462ab19",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
