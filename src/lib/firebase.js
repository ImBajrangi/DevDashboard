import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAr78jEl1kzZ_MKRieUBlk5o5lO2p24vQU",
  authDomain: "santvaanig.firebaseapp.com",
  projectId: "santvaanig",
  storageBucket: "santvaanig.firebasestorage.app",
  messagingSenderId: "1027361942428",
  appId: "1:1027361942428:web:1a6df319b2fbfd6fcd3696",
  measurementId: "G-NN88X7N454"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const logOut = () => signOut(auth);
