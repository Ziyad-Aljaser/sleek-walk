import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export default function Cart() {
  // State to hold the list of cart items
  const [cartItems, setCartItems] = useState([]);
  // Currently using a static user ID for testing and demonstration purposes
  const userId = "UserID";

  // Effect hook to fetch cart items from Firestore on component mount
  useEffect(() => {
    // Asynchronous function to fetch data from Firestore
    const fetchCartItems = async () => {
      // Reference to the user's cart document in Firestore
      const cartRef = doc(db, "carts", userId);
      // Reference to the user's cart_items subcollection
      const cartItemsCollectionRef = collection(cartRef, "cart_items");

      try {
        // Fetching the documents snapshot from the cart_items collection
        const querySnapshot = await getDocs(cartItemsCollectionRef);
        // Transforming Firestore docs to usable format in React state
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Updating state with the fetched cart items
        setCartItems(items);
      } catch (error) {
        // Logging any errors that occur during fetching
        console.error("Error fetching cart items: ", error);
      }
    };

    // Calling the fetch function
    fetchCartItems();
  }, []); // Empty dependency array means this effect runs once after initial render

  // Function to handle quantity changes for cart items
  const handleQtyChange = async (e, item) => {
    // Parsing the new quantity value from the event target
    const newQuantity = parseInt(e.target.value);

    // Reference to the specific cart_item document in Firestore
    const cartItemRef = doc(db, "carts", userId, "cart_items", item.id);

    try {
      // Updating the quantity in the Firestore document
      await updateDoc(cartItemRef, {
        quantity: newQuantity,
      });

      // Updating the local state to reflect the change immediately in the UI
      setCartItems(
        cartItems.map((ci) =>
          ci.id === item.id ? { ...ci, quantity: newQuantity } : ci
        )
      );
    } catch (error) {
      // Logging any errors that occur during the update
      console.error("Error updating quantity: ", error);
    }
  };

  return (
    <Layout>
      <div className="py-2 sm:p-16 bg-base-300">
        <div className="flex flex-col lg:flex-row">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="text-xl font-bold p-2">Product</th>
                <th className="text-xl font-bold p-2">Size</th>
                <th className="text-xl font-bold p-2">QTY</th>
                <th className="text-xl font-bold p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="py-8">
                    <div className="flex items-center">
                      <div className="sm:ml-4">
                        <span className="sm:text-xl">{item.productID}</span>
                        <div className="sm:text-xl md:mt-2">${item.price}</div>
                      </div>
                    </div>
                  </td>
                  <td className="sm:text-xl">{item.size}</td>
                  <td>
                    <select
                      className="select select-primary"
                      value={item.quantity}
                      onChange={(e) => handleQtyChange(e, item)}
                    >
                      {Array.from({ length: 9 }, (_, index) => index + 1).map(
                        (num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        )
                      )}
                    </select>
                  </td>
                  <td className="sm:text-xl">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
