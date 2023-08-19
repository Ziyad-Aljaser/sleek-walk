import React, { useState, useRef } from "react";
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
      size: 10,
      price: 1.2,
      qty: 4,
      total: 4.8,
      img: men_dress_shoes_1,
    },
    {
      product: "Banana",
      size: 8,
      price: 0.8,
      qty: 5,
      total: 4.0,
      img: men_dress_shoes_1,
    },
    {
      product: "Cherry",
      size: 9,
      price: 2.5,
      qty: 3,
      total: 7.5,
      img: men_dress_shoes_1,
    },
  ]);

  // Qty Slecetion Handler
  const handleQtyChange = (event, productToUpdate) => {
    const newQty = parseInt(event.target.value);

    // Update the products state
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.product === productToUpdate.product) {
          const newTotal = product.price * newQty;
          return { ...product, qty: newQty, total: newTotal };
        }
        return product;
      });
    });
  };

  // Delete Button Handler
  const handleDelete = (productName) => {
    const updatedProducts = products.filter((p) => p.product !== productName);
    setProducts(updatedProducts);
    console.log("Deleted Successfully");
  };

  // Used for the remove confirmation modal
  const [selectedProduct, setSelectedProduct] = useState(null);

  const modalRef = useRef(null);

  const openModal = (product) => {
    setSelectedProduct(product);
    const modalElement = document.getElementById("delete_modal");
    if (modalElement) {
      modalElement.showModal();
    }
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
      <div className="py-2 sm:p-16 bg-base-300">
        {/* Wrap the table and cart summary in a flex container */}
        <div className="flex flex-col lg:flex-row">
          {/* Table */}
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
              {products.map((product, index) => (
                <tr key={index}>
                  {/* Product image with the delete button */}
                  <td className="py-8">
                    <div className="flex items-center">
                      <div className="indicator z-[0] relative">
                        {/* Trigger Modal */}
                        <span
                          className="indicator-item badge badge-secondary cursor-pointer"
                          onClick={() => openModal(product)}
                        >
                          ✕
                        </span>

                        {/* Delete Modal */}
                        <dialog
                          ref={modalRef}
                          id="delete_modal"
                          className="modal"
                        >
                          <form method="dialog" className="modal-box">
                            <h3 className="font-bold text-lg">
                              Remove Confirmation
                            </h3>
                            <p className="py-4">
                              Are you sure you want to remove{" "}
                              {selectedProduct?.product}?
                            </p>
                            <div className="modal-action">
                              <button
                                className="btn"
                                onClick={() => {
                                  handleDelete(selectedProduct.product);
                                  setSelectedProduct(null);
                                }}
                              >
                                Confirm
                              </button>
                              <button
                                className="btn"
                                onClick={() => setSelectedProduct(null)}
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </dialog>

                        <div className="avatar">
                          <div className="w-12 sm:w-24 rounded">
                            <img src={product.img} alt={product.product} />
                          </div>
                        </div>
                      </div>
                      {/* Displaying the product name */}
                      <span className="sm:ml-4 sm:text-xl">
                        {product.product}
                      </span>{" "}
                    </div>
                  </td>

                  {/* Size Section */}
                  <td className="sm:text-xl">{product.size}</td>

                  {/* Qty Section */}
                  <td>
                    <select
                      className="select select-primary"
                      value={product.qty}
                      onChange={(e) => handleQtyChange(e, product)}
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
                  <td className="sm:text-xl">${product.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Cart Summary and Checkout Button */}
          <div className="flex flex-col space-y-4 lg:w-1/4 mt-5 lg:mt-0 :ml-5 mb-12">
            {/* Cart Summary */}
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

            {/* Checkout Button */}
            <Link
              to="/checkout"
              className="btn btn-primary w-full"
              onClick={handleButtonClick}
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
