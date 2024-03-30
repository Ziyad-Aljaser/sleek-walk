import {
  doc,
  getDoc,
  collection,
  getDocs,
  query as firebaseQuery,
  where,
} from "firebase/firestore";

// Function to fetch active cart ID
export const getActiveCartId = async (userId, db) => {
  // console.log("Fetching active cart ID for user: ", userId);
  const userCartsRef = collection(db, `users/${userId}/user_carts`);
  const activeCartSnapshot = await getDocs(
    firebaseQuery(userCartsRef, where("status", "==", false))
  );
  if (!activeCartSnapshot.empty) {
    return activeCartSnapshot.docs[0].id;
  } else {
    // Handle the case where there is no active cart
    return null;
  }
};

// Function to fetch user role
export const getUserRole = async (userId, db) => {
  // console.log("Fetching user role for user: ", userId);
  const userDocRef = doc(db, "users", userId);
  const userDocSnapshot = await getDoc(userDocRef);

  if (userDocSnapshot.exists()) {
    return userDocSnapshot.data().role; // Assuming the field is named 'role'
  } else {
    // Handle the case where the user does not exist or role is not set
    return null;
  }
};

// Function to fetch user address
export const getUserAddress = async (userId, db) => {
  // console.log("Fetching user address for user: ", userId);
  const userAddressRef = collection(db, `users/${userId}/user_address`);
  const querySnapshot = await getDocs(userAddressRef);
  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data();
  } else {
    // Handle the case where the user has no address
    return null;
  }
};