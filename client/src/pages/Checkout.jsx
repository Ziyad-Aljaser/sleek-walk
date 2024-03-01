import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Layout from "../components/Layout/Layout";
import Address from "../components/Checkout/Address";
import Payment from "../components/Checkout/Payment";

import shopping_bag from "../assets/shopping_bag.png";
import { useAuth } from "../contexts/AuthContext";

import { db } from "../config/firebase";

import { getDocs, collection, doc, setDoc } from "firebase/firestore";

export default function Checkout() {
  // Get the current user from the authentication hook
  const { currentUser } = useAuth();

  // A test user ID for demonstration purposes
  const UserID = currentUser.uid;

  // State to store the user's address if it exists
  const [userAddress, setUserAddress] = useState(null);

  // States for address input fields
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");

  // Effect hook to fetch user address from Firestore
  useEffect(() => {
    console.log("Address useEffect triggered");
    // Asynchronous function to fetch user address
    const getUserAddress = async () => {
      const userAddressRef = collection(db, `users/${UserID}/user_address`);
      const querySnapshot = await getDocs(userAddressRef);
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data();
      } else {
        // Handle the case where the user has no address
        return null;
      }
    };

    const fetchAddress = async () => {
      const addressData = await getUserAddress();
      if (addressData) {
        setUserAddress(addressData);
      } else {
        console.log("No address data found");
        setUserAddress(null); // Ensure user address is set to null if not found
      }
    };

    fetchAddress();
  }, [UserID]); // Dependency on testUserID to refetch if it changes

  // Function to handle saving the address to Firestore
  const handleSaveAddress = async () => {
    if (country && city && street) {
      try {
        const addressDetails = { country, city, street };
        const userAddressDocRef = doc(
          db,
          "users",
          UserID,
          "user_address",
          "single_address"
        );

        // Merge true allows to update the document or create it if it doesn't exist
        await setDoc(userAddressDocRef, addressDetails, { merge: true });

        alert("Address saved successfully!");
        setUserAddress(addressDetails);
      } catch (err) {
        alert("Error saving address. Please try again.");
        console.error(err);
      }
    }
  };

  const handleNextClick = () => {
    if (step === 0) {
      // Basic validation: Check if country, city, or street is empty
      if (userAddress || (country && city && street)) {
        nextStep(); // Proceed to the next step
      } else {
        alert("Please fill out all the address details.");
      }
    } else if (step === 1) {
      // Basic validation: Check if the form is valid
      if (formIsValid) {
        nextStep(); // Proceed to the next step
      } else {
        alert("Please fill out all the payment details.");
      }
    }
  };

  const [step, setStep] = useState(0);
  const [formIsValid, setFormIsValid] = useState(false);
  const updateFormValidity = (isValid) => {
    setFormIsValid(isValid);
  };


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
                  <Address
                    userAddress={userAddress}
                    country={country}
                    setCountry={setCountry}
                    city={city}
                    setCity={setCity}
                    street={street}
                    setStreet={setStreet}
                  />
                  <div className="form-control mt-8">
                    <button
                      onClick={() => {
                        handleNextClick();
                        handleSaveAddress();
                      }}
                      className="btn btn-primary"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Payment Secion */}
              {step === 1 && (
                <div>
                  <Payment updateFormValidity={updateFormValidity}/>
                  <div className="form-control mt-6 flex flex-row justify-between">
                  <button onClick={prevStep} className="btn btn-primary w-1/4">
                    Back
                  </button>
                  <button onClick={handleNextClick} disabled={!formIsValid} className="btn btn-primary w-1/4">
                    Next
                  </button>
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

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
