import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyASF-QkdPWpN3TZDlDoJkjzHhBYiTP8cFc",
	authDomain: "practice-management-system.firebaseapp.com",
	projectId: "practice-management-system",
	storageBucket: "practice-management-system.appspot.com",
	messagingSenderId: "589602959389",
	appId: "1:589602959389:web:f8a411da634636157856f4",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebaseApp.firestore();
const storage = firebase.storage();
const functions = firebase.functions();
// if (location.hostname === "localhost") {
// 	functions.useEmulator("localhost", 5001);
// }

export {firebaseApp, db, auth, storage, functions };
