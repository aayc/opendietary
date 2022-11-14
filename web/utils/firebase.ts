// Use modular imports of firebase to add auth
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

type UserProfile = {
    firstName: string | null;
    lastName: string | null;
}

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCrjxPuzZZ0FmGfD01sOidmC8WZgU2AKg",
  authDomain: "opendietary.firebaseapp.com",
  databaseURL: "https://opendietary-default-rtdb.firebaseio.com",
  projectId: "opendietary",
  storageBucket: "opendietary.appspot.com",
  messagingSenderId: "428240700645",
  appId: "1:428240700645:web:59d90949ea9b0c8744c00c",
  measurementId: "G-P9RKK6LZXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth();
const db = getDatabase();

async function updateUserProfile(update: Partial<UserProfile>) {
    if (auth.currentUser) {
        await set(ref(db, `users/${auth.currentUser.uid}/profile`), update);
    }
}

export { auth, db, updateUserProfile };