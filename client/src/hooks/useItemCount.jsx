import { useState, useEffect } from 'react';
import { getActiveCartId } from '../utils/FirestoreUtils';
import { collection, getDocs} from 'firebase/firestore';

// Custom hook to fetch item count
const useItemCount = (userId, db) => {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      const activeCartId = await getActiveCartId(userId, db);
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
