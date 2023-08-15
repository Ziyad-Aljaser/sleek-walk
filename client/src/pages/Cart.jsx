import React, { useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../components/Layout";

import men_dress_shoes_1 from "../assets/Shoes_Images/men_dress_shoes_1.png";

export default function Cart() {
  // Test
  const handleButtonClick = () => {
    console.log("Checkout Button Clicked!");
  };

  // Sample data for demonstration
  const [products, setProducts] = useState([
    {
      product: "Apple",
      price: 1.2,
      qty: 4,
      total: 4.8,
      img: men_dress_shoes_1,
    },
    {
      product: "Banana",
      price: 0.8,
      qty: 5,
      total: 4.0,
      img: men_dress_shoes_1,
    },
    {
      product: "Cherry",
      price: 2.5,
      qty: 3,
      total: 7.5,
      img: men_dress_shoes_1,
    },
  ]);

  // Delete Button Handler
  const handleDelete = (productName) => {
    const updatedProducts = products.filter((p) => p.product !== productName);
    setProducts(updatedProducts);
    console.log("Deleted Successfully");
  };

  // Used for the cart summary
  const subtotal = products.reduce((sum, product) => sum + product.total, 0);
  const taxRate = 0.1; // 10% tax rate
  const taxAmount = subtotal * taxRate;
  const shippingFees = 5.0;
  const total = subtotal + taxAmount + shippingFees;

  // The page when the cart is empty
  if (products.length === 0) {
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
      <div className="p-2 sm:p-16 bg-base-300">
        {/* Table */}
        <table className="table w-full">
          {/* Table Header */}
          <thead>
            <tr>
              <th className="text-xl font-bold p-2">Product</th>
              <th className="text-xl font-bold p-2">Price</th>
              <th className="text-xl font-bold p-2">QTY</th>
              <th className="text-xl font-bold p-2">Total</th>
            </tr>
          </thead>

          {/* Table Content */}
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                {/* Product image with the delete button */}
                <td className="py-8">
                  <div className="flex items-center">
                    <div className="indicator z-[0] relative">
                      <span
                        className="indicator-item badge badge-secondary cursor-pointer"
                        onClick={() => handleDelete(product.product)} // Using product name to identify which product to delete
                      >
                        ✕
                      </span>
                      <div className="avatar">
                        <div className="w-16 sm:w-24 rounded">
                          <img src={product.img} alt={product.product} />
                        </div>
                      </div>
                    </div>
                    {/* Displaying the product name */}
                    <span className="ml-4 sm:text-xl">
                      {product.product}
                    </span>{" "}
                  </div>
                </td>

                <td className="sm:text-xl">${product.price.toFixed(2)}</td>
                <td className="sm:text-xl">{product.qty}</td>
                <td className="sm:text-xl">${product.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Cart Summary */}
        <div className="flex justify-end p-5">
          <div className="w-full sm:w-1/4">
            <div className="border rounded-xl shadow-lg overflow-hidden bg-base-200">
              <div className="p-4 text-xl font-bold text-center">
                Cart Summary
              </div>
              <div className="p-4">
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                <p>Tax (10%): ${taxAmount.toFixed(2)}</p>
                <p>Shipping: ${shippingFees.toFixed(2)}</p>
                <hr className="my-4" />
                <p className="font-bold">Total: ${total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="flex justify-center">
          <Link
            to="/checkout"
            className="btn btn-primary w-64"
            onClick={handleButtonClick}
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </Layout>
  );
}
