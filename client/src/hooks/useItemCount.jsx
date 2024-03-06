import { useState, useEffect } from 'react';
import { collection, getDocs, query as firebaseQuery, where } from 'firebase/firestore';

// Custom hook to fetch item count
const useItemCount = (userId, db) => {
  const [itemCount, setItemCount] = useState(0);

  // Asynchronous function to fetch active cart ID
  const getActiveCartId = async () => {
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

  useEffect(() => {
    const fetchCartItems = async () => {
      const activeCartId = await getActiveCartId();
      if (activeCartId) {
        const cartItemsCollectionRef = collection(
          db,
          `users/${userId}/user_carts/${activeCartId}/cart_items`
        );
        try {
          const querySnapshot = await getDocs(cartItemsCollectionRef);
          let totalItemCount = 0;
          querySnapshot.docs.forEach((doc) => {
            const data = doc.data();
            totalItemCount += data.quantity; // Add the item's quantity to the total count
          });
          setItemCount(totalItemCount); // Update the state with the new item count
        } catch (error) {
          console.error("Error fetching cart items: ", error);
        }
      }
    };

    fetchCartItems();
  }, [userId, db]); // Dependency array to re-run the effect if userId or db changes

  return itemCount;
};

export default useItemCount;
