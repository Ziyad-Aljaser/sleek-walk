import { collection, doc, getDocs, getDoc, query, setDoc, where } from 'firebase/firestore';


// Function to fetch active cart ID or create a new cart if it doesn't exist
export const getActiveCartId = async (userId, db) => {
  const userCartsRef = collection(db, `users/${userId}/user_carts`);
  const activeCartSnapshot = await getDocs(
    query(userCartsRef, where("status", "==", false))
  );

  if (!activeCartSnapshot.empty) {
    // Active cart exists, return the first active cart's ID
    return activeCartSnapshot.docs[0].id;
  } else {
    // No active cart, create a new cart document and return its ID
    const cartDocRef = doc(userCartsRef); // Automatically generate a new document ID
    await setDoc(cartDocRef, { status: false }); // Assuming 'status: false' indicates an active cart
    return cartDocRef.id; // Return the newly created cart's ID
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