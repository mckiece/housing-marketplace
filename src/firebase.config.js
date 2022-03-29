import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: "house-marketplace-app-29ce5.firebaseapp.com",
	projectId: "house-marketplace-app-29ce5",
	storageBucket: "house-marketplace-app-29ce5.appspot.com",
	messagingSenderId: "3085991166",
	appId: "1:3085991166:web:52f0d9a867020c605239af",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
