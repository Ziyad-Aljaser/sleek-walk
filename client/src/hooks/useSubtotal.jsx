import { useState, useEffect } from 'react';
import { getActiveCartId } from '../utils/FirestoreUtils';
import { collection, getDocs } from 'firebase/firestore';

// Custom hook to fetch subtotal
const useSubtotal = (userId, db) => {
  const [subtotal, setSubtotal] = useState(0.0);

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
          let totalSubtotal = 0.0;
          querySnapshot.docs.forEach((doc) => {
            const data = doc.data();
            totalSubtotal += data.price * data.quantity; // Calculate the subtotal
          });
          setSubtotal(totalSubtotal); // Update the state with the new subtotal
        } catch (error) {
          console.error("Error fetching cart items: ", error);
        }
      }
    };

    fetchCartItems();
  }, [userId, db]); // Dependency array to re-run the effect if userId changes

  return subtotal;
};

export default useSubtotal;
