// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey:" process.env.REACT_APP_API_KEY",
	authDomain: "todo-pro-33b1d.firebaseapp.com",
	projectId: "todo-pro-33b1d",
	storageBucket: "todo-pro-33b1d.appspot.com",
	messagingSenderId: "956551464074",
	appId: "1:956551464074:web:8fe298bb7779722b44d973",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const db= getFirestore(app)
 