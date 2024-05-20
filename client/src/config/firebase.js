import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { getFirestore } from 'firebase/firestore';


// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDsVUpLAfF9kcUx4CSSea1AVdoPCWjQECg",
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

  
  // --------------------------------------------------------------

  // Firestore Database Structure:

  // /users (collection)
  //   /{UserID} (document)
  //     /user_carts (subcollection)
  //       /{CartID} (document)
  //         - status: (boolean) - true for completed, false for active/not completed
  //         /cart_items (subcollection)
  //           /{ItemID} (document)
  //             - productID: (int)
  //             - title: (string)
  //             - price: (float)
  //             - size: (int)
  //             - quantity: (int)
  //     /user_address (subcollection)
  //       /{AddressID} (document)
  //         - country: (string)
  //         - city: (string)
  //         - street: (string)

  // --------------------------------------------------------------

