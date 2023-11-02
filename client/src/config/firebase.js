import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { getFirestore } from 'firebase/firestore';


// Your Firebase configuration object
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "sleek-walk.firebaseapp.com",
  projectId: "sleek-walk",
  storageBucket: "sleek-walk.appspot.com",
  messagingSenderId: "434933392512",
  appId: "1:434933392512:web:597270a7f193f8ba0ef265",
  measurementId: "G-3W4T1NHEDZ"
};

const app = initializeApp(firebaseConfig); // Initialize Firebase

export const db = getFirestore(app); // Get Database instance
export const auth = getAuth(app); // Get Auth instance

export { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile }; // Export the functions

  // addresses database structure:
  // /firestore
  
  // --------------------------------------------------------------

  // carts database structure:
  // /firestore
  // /carts (collection)
  //   /{UserID} (document)
  //     - status: (boolean) - true for completed, false for active/not completed
  //     /cart_items (subcollection)
  //       /{ItemID} (document)
  //         - productID: (string)
  //         - title: (string)
  //         - price: (int)
  //         - size: (int)
  //         - quantity: (int)