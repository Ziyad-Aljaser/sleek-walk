import React, { useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../components/Layout";

import shopping_bag from "../assets/shopping_bag.png";

export default function Signup() {
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

  // Regular expression to match non-alphabetic characters
  const handleNameChange = (event) => {
    const nonAlphabetical = /[^A-Za-z\s]/g;
    event.target.value = event.target.value.replace(nonAlphabetical, "");
  };

  // Regular expression to remove non-numeric characters
  const handleCreditCardChange = (event) => {
    const nonNumeric = /[^0-9]/g;
    let value = event.target.value.replace(nonNumeric, "");

    // Add a space after every 4 digits
    value = value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");

    event.target.value = value;
  };

  // Regular expression to remove non-numeric characters and existing slashes
  const handleExpirationDateChange = (event) => {
    // Regular expression to remove non-numeric characters and existing slashes
    const nonNumeric = /[^0-9]/g;
    let value = event.target.value.replace(nonNumeric, "");

    // If the first character is bigger than 2, prepend with 0
    if (value.length === 1 && parseInt(value) > 2) {
      value = "0" + value;
    }

    // If more than two characters, add a '/' after the 2nd digit
    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }

    event.target.value = value;
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-base-300 p-5">
        <div className="flex flex-col items-center w-full">
          {/* Steps Section */}
          <ul className="steps mb-12 z-[0] sm:w-1/2">
            <li className={step >= 0 ? "step step-primary" : "step"}>
              Shipping Address
            </li>
            <li className={step >= 1 ? "step step-primary" : "step"}>
              Payment
            </li>
            <li className={step >= 2 ? "step step-primary" : "step"}>
              Review & Confirm
            </li>
          </ul>

          <div className="card bg-base-100 shadow-xl w-full max-w-md">
            <div className="card-body">
              <h1 className="text-4xl font-bold text-center mb-6">Checkout</h1>

              {/* Address Section */}
              {step === 0 && (
                <div>
                  {/* Counrty */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Country</span>
                    </label>
                    <select className="select select-bordered select-primary w-full">
                      <option disabled selected>
                        Select a country
                      </option>
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
                    <input
                      type="text"
                      placeholder="city"
                      className="input input-bordered input-primary"
                    />
                  </div>

                  {/* Street */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Street</span>
                    </label>
                    <input
                      type="text"
                      placeholder="street"
                      className="input input-bordered input-primary"
                    />
                  </div>

                  <div className="form-control mt-8">
                    <button onClick={nextStep} className="btn btn-primary">
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Payment Secion */}
              {step === 1 && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Cardholder Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="cardholder name"
                    className="input input-bordered input-primary"
                    onChange={handleNameChange}
                  />

                  <label className="label mt-5">
                    <span className="label-text">Credit Card Information</span>
                  </label>
                  <input
                    type="text"
                    placeholder="card number"
                    className="input input-bordered input-primary"
                    onChange={handleCreditCardChange}
                    maxLength={19} // 16 digits + 3 spaces
                  />

                  <div className="flex flex-col sm:flex-row">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="input input-bordered input-primary sm:w-1/4 mt-5 sm:mr-5"
                      onChange={handleExpirationDateChange}
                      maxLength="5"
                    />
                    <input
                      type="password"
                      placeholder="CVC"
                      className="input input-bordered input-primary sm:w-1/4 mt-5"
                      maxLength="3"
                    />
                  </div>
                </div>
              )}

              {/* Review & Confirm */}
              {step === 2 && (
                <div>
                  <p className="text-center mb-6">
                    Review your details and confirm
                  </p>

                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    type="fname"
                    placeholder="first name"
                    className="input input-bordered w-full max-w-xs"
                    disabled
                  />

                  <label className="label">
                    <span className="label-text">last Name</span>
                  </label>
                  <input
                    type="lname"
                    placeholder="last name"
                    className="input input-bordered w-full max-w-xs"
                    disabled
                  />

                  <div className="form-control mt-8">
                    <button
                      className="btn btn-primary"
                      onClick={() => window.order_modal.showModal()}
                    >
                      Complete Order
                    </button>
                    <dialog id="order_modal" className="modal">
                      <form method="dialog" className="modal-box">
                        <Link
                          to={"/"}
                          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        >
                          ✕
                        </Link>
                        <img
                          src={shopping_bag}
                          alt="Shopping Bag"
                          className="w-1/3 max-w-xs mx-auto"
                        />
                        <h1 className="font-bold text-xl text-center py-12">
                          Your order has been placed successfully!
                        </h1>
                      </form>
                    </dialog>
                  </div>
                </div>
              )}

              {/* Next/Back Section */}
              {step > 0 && step < 2 && (
                <div className="form-control mt-6 flex flex-row justify-between">
                  <button onClick={prevStep} className="btn btn-primary w-1/4">
                    Back
                  </button>
                  <button onClick={nextStep} className="btn btn-primary w-1/4">
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
