import { collection, getDocs, query as firebaseQuery, where } from 'firebase/firestore';

// Function to fetch active cart ID
export const getActiveCartId = async (userId, db) => {
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
