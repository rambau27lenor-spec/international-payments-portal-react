import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjjI5Ka9rNX3JASWp1m9CkQHrCuHYS_qk",
  authDomain: "international-payments-p-734ab.firebaseapp.com",
  projectId: "international-payments-p-734ab",
  storageBucket: "international-payments-p-734ab.firebasestorage.app",
  messagingSenderId: "589763352394",
  appId: "1:589763352394:web:fab732d49c4afaf29293b3",

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);