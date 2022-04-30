import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  getFirestore,
  serverTimestamp,
  Timestamp,
  increment,
  collection,
  query,
  getDocs,
  where,
  limit,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASEURL,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSADINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
};

initializeApp(firebaseConfig);

// Auth exports
export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();

// Firestore exports
export const firestore = getFirestore();
export const getserverTimestamp = serverTimestamp();
export const fromMillis = Timestamp.fromMillis;
export const increment = increment();

// Storage exports
export const storage = getStorage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

/// Helper functions

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = collection("users");
  const queryref = query(usersRef, where("username", "==", username), limit(1));
  const userDoc = (await getDocs(queryref)).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}
