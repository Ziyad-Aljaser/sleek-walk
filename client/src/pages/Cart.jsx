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

  // Used for the steps section
  const [step, setStep] = useState(0);

  const nextStep = () => {
      if (step < 3) {
          setStep(step + 1);
      }
  };

  const prevStep = () => {
      if (step > 0) {
          setStep(step - 1);
      }
  };

  return (
    <Layout>
      <div className="p-2 sm:p-16 bg-base-300 flex flex-col justify-center">

        {/* Steps Section */}
        <ul className="steps mb-12 z-[0] self-center">
          <li className={step >= 0 ? "step step-primary" : "step"}>View Cart</li>
          <li className={step >= 1 ? "step step-primary" : "step"}>Address</li>
          <li className={step >= 2 ? "step step-primary" : "step"}>Payment</li>
          <li className={step >= 3 ? "step step-primary" : "step"}>Review & Confirm</li>
        </ul>

        {/* Cart Section */}
        {step === 0 && (
          <div className="w-full">
            {/* Table Section */}
            <table className="table">

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
                      <div className="indicator z-[0]">
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

            <div className="flex justify-center">
              <button onClick={nextStep} className="btn btn-primary w-64">Next</button>
            </div>

          </div>
        )}

        {/* Address Section */}
        {step === 1 && (
          <div className="flex flex-col justify-center items-center my-auto">
            <div className="card bg-base-100 shadow-xl w-full max-w-md">
              <div className="card-body">
                
                  <h1 className="text-4xl font-bold text-center mb-6">Address</h1>

                  {/* Counrty */}
                  <div className="form-control">
                      <label className="label">
                          <span className="label-text">Country</span>
                      </label>
                      <select className="select select-bordered select-primary w-full">
                          <option disabled selected>Select a country</option>
                          <option value="CAN">Canada</option>
                          <option value="KSA">Saudi Arabia</option>
                          <option value="GBR">United Kingdom</option>
                          <option value="USA">United States</option>
                      </select>
                  </div>

                  {/* City */}
                  <div className="form-control">
                      <label className="label">
                          <span className="label-text">City</span>
                      </label>
                      <input type="text" placeholder="City" className="input input-bordered input-primary" />
                  </div>

                  {/* Street */}
                  <div className="form-control">
                      <label className="label">
                          <span className="label-text">Street</span>
                      </label>
                      <input type="text" placeholder="Street" className="input input-bordered input-primary" />
                  </div>

                  <div className="form-control mt-6 flex flex-row justify-between">
                    <button onClick={prevStep} className="btn btn-primary w-1/4">Back</button>
                    <button onClick={nextStep} className="btn btn-primary w-1/4">Next</button>
                  </div>

              </div>             
            </div>
          </div>
        )}

        {/* Payment Section */}
        {step === 2 && (
          <div className="flex flex-col justify-center items-center my-auto">
            <div className="card bg-base-100 shadow-xl w-full max-w-md">
              <div className="card-body">
                
                  <h1 className="text-4xl font-bold text-center mb-6">Address</h1>

                  {/* Counrty */}
                  <div className="form-control">
                      <label className="label">
                          <span className="label-text">Country</span>
                      </label>
                      <select className="select select-bordered select-primary w-full">
                          <option disabled selected>Select a country</option>
                          <option value="CAN">Canada</option>
                          <option value="KSA">Saudi Arabia</option>
                          <option value="GBR">United Kingdom</option>
                          <option value="USA">United States</option>
                      </select>
                  </div>

                  {/* City */}
                  <div className="form-control">
                      <label className="label">
                          <span className="label-text">City</span>
                      </label>
                      <input type="text" placeholder="City" className="input input-bordered input-primary" />
                  </div>

                  {/* Street */}
                  <div className="form-control">
                      <label className="label">
                          <span className="label-text">Street</span>
                      </label>
                      <input type="text" placeholder="Street" className="input input-bordered input-primary" />
                  </div>

                  <div className="form-control mt-6 flex flex-row justify-between">
                    <button onClick={prevStep} className="btn btn-primary w-1/4">Back</button>
                    <button onClick={nextStep} className="btn btn-primary w-1/4">Next</button>
                  </div>

              </div>             
            </div>
          </div>
        )}

        {/* Review & Confirm */}
        {step === 3 && (
          <div className="flex flex-col justify-center items-center my-auto">
            <div className="card bg-base-100 shadow-xl w-full max-w-md">
              <div className="card-body">
                <h1 className="text-4xl font-bold text-center mb-6">Address</h1>
                <p className="text-center mb-6">Review your details and confirm</p>

                <label className="label">
                    <span className="label-text">First Name</span>
                </label>
                <input type="fname" placeholder="first name" className="input input-bordered w-full max-w-xs" disabled />

                <label className="label">
                    <span className="label-text">last Name</span>
                </label>
                <input type="lname" placeholder="last name" className="input input-bordered w-full max-w-xs" disabled />
                
                <div className="form-control mt-8">
                    <button className="btn btn-primary">Complete Order</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );

}