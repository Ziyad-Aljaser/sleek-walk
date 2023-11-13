import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";

import Layout from "../components/Layout";

import cart_summary from "../assets/cart_summary.png";
import men_dress_shoes_1 from "../assets/Shoes_Images/men_dress_shoes_1.png";

export default function Cart() {
  // State to hold the list of cart items
  const [cartItems, setCartItems] = useState([]);
  const userId = "UserID"; // Currently using a static user ID for testing and demonstration purposes

  // Asynchronous function to fetch active cart ID
  const getActiveCartId = async () => {
    const userCartsRef = collection(db, `users/${userId}/user_carts`);
    const activeCartSnapshot = await getDocs(
      query(userCartsRef, where("status", "==", false))
    );
    return activeCartSnapshot.empty ? null : activeCartSnapshot.docs[0].id;
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

  // Calculate cart summary based on fetched cart items
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxRate = 0.1; // 10% tax rate
  const taxAmount = subtotal * taxRate;
  const shippingFees = 5.0;
  const total = subtotal + taxAmount + shippingFees;

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

  // Test button
  const cartButtonClick = () => {
    console.log("Checkout Button Clicked!");
  };

  // The page when the cart is empty
  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="bg-base-300 flex justify-center items-center h-screen">
          <h1 className="text-4xl sm:text-5xl font-bold">Your cart is empty</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-2 sm:p-16 bg-base-300">
        {/* Wrap the products table and cart summary in a flex container */}
        <div className="flex flex-col lg:flex-row">
          {/* Products Table */}
          <table className="table w-full">
            {/* Table Header */}
            <thead>
              <tr>
                <th className="text-xl font-bold p-2">Product</th>
                <th className="text-xl font-bold p-2">Size</th>
                <th className="text-xl font-bold p-2">QTY</th>
                <th className="text-xl font-bold p-2">Total</th>
              </tr>
            </thead>
            {/* Table Content */}
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="py-8">
                    <div className="flex items-center">
                      <div className="sm:ml-4">
                        {/* Displaying the product name */}
                        <span className="sm:text-xl">{item.title}</span>
                        {/* Displaying the product price */}
                        <div className="sm:text-xl md:mt-2">${item.price}</div>
                      </div>
                    </div>
                  </td>
                  {/* Size Section */}
                  <td className="sm:text-xl">{item.size}</td>
                  {/* Qty Section */}
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
                  {/* Total Price Section */}
                  <td className="sm:text-xl">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Cart Summary and Checkout Button */}
          <div className="flex flex-col space-y-4 lg:w-1/4 mt-5 lg:mt-0 mb-12 p-12 lg:p-0">
            {/* Cart Summary */}
            <div className="border rounded-xl shadow-lg overflow-hidden bg-neutral-content">
              <div className="p-4 text-xl font-bold text-center text-black">
                Cart Summary
              </div>
              <img src={cart_summary} alt="cart summary" className="mx-auto" />
              <div className="p-4 text-black">
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                <p>Tax (10%): ${taxAmount.toFixed(2)}</p>
                <p>Shipping: ${shippingFees.toFixed(2)}</p>
                <hr className="my-4" />
                <p className="font-bold">Total: ${total.toFixed(2)}</p>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              to="/checkout"
              className="btn btn-primary w-full"
              onClick={cartButtonClick}
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
