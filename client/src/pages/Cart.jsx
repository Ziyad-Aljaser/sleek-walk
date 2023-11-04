import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";

export default function Cart() {
  // State to hold the list of cart items
  const [cartItems, setCartItems] = useState([]);
  // Currently using a static user ID for testing and demonstration purposes
  const userId = "UserID";

  // Asynchronous function to fetch active cart ID
  const getActiveCartId = async () => {
    const userCartsRef = collection(db, `users/${userId}/user_carts`);
    const activeCartSnapshot = await getDocs(
      query(userCartsRef, where("status", "==", false))
    );
    if (!activeCartSnapshot.empty) {
      return activeCartSnapshot.docs[0].id;
    } else {
      // Handle the case where there is no active cart
      return null;
    }
  };

  // Effect hook to fetch cart items from Firestore on component mount
  useEffect(() => {
    console.log("Cart useEffect triggered");
    const fetchCartItems = async () => {
      const activeCartId = await getActiveCartId();
      if (activeCartId) {
        const cartItemsCollectionRef = collection(
          db,
          `users/${userId}/user_carts/${activeCartId}/cart_items`
        );
        try {
          const querySnapshot = await getDocs(cartItemsCollectionRef);
          const items = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCartItems(items);
        } catch (error) {
          console.error("Error fetching cart items: ", error);
        }
      }
    };

    fetchCartItems();
  }, [userId]); // Dependency on userId to refetch if it changes

  // Function to handle quantity changes for cart items
  const handleQtyChange = async (e, item) => {
    const newQuantity = parseInt(e.target.value, 10);
    const activeCartId = await getActiveCartId();

    if (activeCartId) {
      const cartItemRef = doc(
        db,
        `users/${userId}/user_carts/${activeCartId}/cart_items`,
        item.id
      );
      try {
        await updateDoc(cartItemRef, {
          quantity: newQuantity,
        });
        setCartItems(
          cartItems.map((ci) =>
            ci.id === item.id ? { ...ci, quantity: newQuantity } : ci
          )
        );
      } catch (error) {
        console.error("Error updating quantity: ", error);
      }
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
                        <span className="sm:text-xl">{item.title}</span>
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
