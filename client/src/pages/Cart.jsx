import React, { useState } from 'react';

import Layout from "../components/Layout";

import men_dress_shoes_1 from "../assets/Shoes_Images/men_dress_shoes_1.png"

export default function Cart() {
  // Sample data for demonstration
  const [products, setProducts] = useState([
    { product: "Apple", price: 1.2, qty: 4, total: 4.8, img: men_dress_shoes_1 },
    { product: "Banana", price: 0.8, qty: 5, total: 4.0, img: men_dress_shoes_1 },
    { product: "Cherry", price: 2.5, qty: 3, total: 7.5, img: men_dress_shoes_1 },
  ]);

  // Delete Button Handler
  const handleDelete = (productName) => {
    const updatedProducts = products.filter(p => p.product !== productName);
    setProducts(updatedProducts);
    console.log("Deleted Successfully")
  }

  return (
    <Layout>
      <div className="p-2 sm:p-16 bg-base-300">
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
                  <div className="indicator">
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
                </td>

                <td>${product.price.toFixed(2)}</td>
                <td>{product.qty}</td>
                <td>${product.total.toFixed(2)}</td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </Layout>
  );

}