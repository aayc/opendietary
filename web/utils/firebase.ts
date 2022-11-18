// Use modular imports of firebase to add auth
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, push } from "firebase/database";
import { getNutritionByItemId } from "./nutritionix";
import { HistoryItem } from "../shared/type_helper";
import { assert } from "console";

type UserProfile = {
  firstName: string | null;
  lastName: string | null;
};

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
  measurementId: "G-P9RKK6LZXX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

async function updateUserProfile(update: Partial<UserProfile>) {
  if (auth.currentUser) {
    await set(ref(db, `profiles/${auth.currentUser.uid}`), update);
  }
}

function getPushKey(path: string): string | null {
  return push(ref(db, path)).key;
}

async function tryAddHistoryItem(uid: string, pushKey: string, date: Date, itemId: string, quantity: number): Promise<boolean> {
  const nutrition = await getNutritionByItemId(itemId);
  if (!nutrition) {
    return false;
  }

  const historyItem: HistoryItem = {
    tracking_date: new Date().toISOString(), // TODO only allow setting this on the server?
    date: date.toISOString(),
    nutrition: nutrition,
    quantity: quantity,
  };
  try {
    await set(ref(db, `history/${uid}/${pushKey}`), historyItem);
  } catch (err) {
    console.log("Error adding history item: " + err);
    return false;
  }
  return true;
}

async function tryRemoveHistoryItem(uid: string, pushKey: string): Promise<boolean> {
  try {
    await set(ref(db, `history/${uid}/${pushKey}`), null);
  } catch (err) {
    console.log("Error removing history item: " + err);
    return false;
  }
  return true;
}

async function tryEditHistoryItem(uid: string, pushKey: string, newHistoryItem: HistoryItem): Promise<boolean> {
  try {
    await set(ref(db, `history/${uid}/${pushKey}`), newHistoryItem); // TODO type guard
  } catch (err) {
    console.log("Error editing history item: " + err);
    return false;
  }
  return true;
}

export { auth, db, updateUserProfile, getPushKey, tryAddHistoryItem, tryRemoveHistoryItem, tryEditHistoryItem };
